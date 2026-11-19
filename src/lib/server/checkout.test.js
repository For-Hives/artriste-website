import { describe, expect, it, vi } from 'vitest'
import {
	clientIp,
	createCheckoutIntent,
	createLimiter,
	verifyTurnstile,
} from './checkout.js'

const OEUVRE = { id: 'abcdefghij12345', name: 'Les lumières', price: 950 }

function deps(overrides = {}) {
	return {
		getOeuvre: vi.fn(async id => (id === OEUVRE.id ? OEUVRE : null)),
		createIntent: vi.fn(async () => ({ client_secret: 'pi_secret' })),
		verifyToken: vi.fn(async () => true),
		perIp: createLimiter({ max: 5, windowMs: 600_000 }),
		global: createLimiter({ max: 60, windowMs: 3_600_000 }),
		...overrides,
	}
}

describe('createCheckoutIntent', () => {
	it('ignore le montant, la devise et la description envoyés par le navigateur', async () => {
		const d = deps()
		const result = await createCheckoutIntent(
			{
				id: OEUVRE.id,
				amount: 1,
				currency: 'usd',
				description: 'falsifié',
				turnstileToken: 't',
			},
			'1.2.3.4',
			d
		)
		expect(result).toEqual({ status: 200, body: { clientSecret: 'pi_secret' } })
		expect(d.createIntent).toHaveBeenCalledTimes(1)
		expect(d.createIntent).toHaveBeenCalledWith({
			amount: 95_000,
			currency: 'eur',
			description: 'Les lumières',
			metadata: { oeuvre_id: OEUVRE.id },
			payment_method_types: ['card'],
		})
	})

	it('refuse une œuvre inconnue ou un identifiant mal formé, sans créer de paiement', async () => {
		const d = deps()
		expect(
			(await createCheckoutIntent({ id: 'zzzzzzzzzzzzzzz' }, 'ip', d)).status
		).toBe(404)
		expect(
			(await createCheckoutIntent({ id: '../admin' }, 'ip', d)).status
		).toBe(400)
		expect((await createCheckoutIntent(null, 'ip', d)).status).toBe(400)
		expect(d.createIntent).not.toHaveBeenCalled()
	})

	it('refuse une œuvre sans prix valable', async () => {
		const d = deps({ getOeuvre: vi.fn(async () => ({ ...OEUVRE, price: 0 })) })
		expect(
			(await createCheckoutIntent({ id: OEUVRE.id }, 'ip', d)).status
		).toBe(404)
		expect(d.createIntent).not.toHaveBeenCalled()
	})

	it('refuse (403) quand la vérification anti-robot échoue', async () => {
		const d = deps({ verifyToken: vi.fn(async () => false) })
		expect(
			(await createCheckoutIntent({ id: OEUVRE.id }, 'ip', d)).status
		).toBe(403)
		expect(d.createIntent).not.toHaveBeenCalled()
	})

	it('freine une même adresse au-delà de 5 tentatives (test de cartes)', async () => {
		const d = deps()
		for (let i = 0; i < 5; i++) {
			expect(
				(await createCheckoutIntent({ id: OEUVRE.id }, '9.9.9.9', d)).status
			).toBe(200)
		}
		expect(
			(await createCheckoutIntent({ id: OEUVRE.id }, '9.9.9.9', d)).status
		).toBe(429)
		expect(
			(await createCheckoutIntent({ id: OEUVRE.id }, '8.8.8.8', d)).status
		).toBe(200)
		expect(d.createIntent).toHaveBeenCalledTimes(6)
	})

	it('plafonne le total, toutes adresses confondues', async () => {
		const d = deps({ global: createLimiter({ max: 2, windowMs: 3_600_000 }) })
		expect((await createCheckoutIntent({ id: OEUVRE.id }, 'a', d)).status).toBe(
			200
		)
		expect((await createCheckoutIntent({ id: OEUVRE.id }, 'b', d)).status).toBe(
			200
		)
		expect((await createCheckoutIntent({ id: OEUVRE.id }, 'c', d)).status).toBe(
			429
		)
	})
})

describe('verifyTurnstile', () => {
	it('refuse en production quand le secret manque', async () => {
		expect(await verifyTurnstile('jeton', { production: true })).toBe(false)
		expect(await verifyTurnstile('jeton', { production: false })).toBe(true)
	})

	it('suit la réponse de Cloudflare', async () => {
		const ok = vi.fn(
			async () => new Response(JSON.stringify({ success: true }))
		)
		const ko = vi.fn(
			async () => new Response(JSON.stringify({ success: false }))
		)
		expect(
			await verifyTurnstile('jeton', {
				secret: 's',
				production: true,
				fetchImpl: ok,
			})
		).toBe(true)
		expect(
			await verifyTurnstile('jeton', {
				secret: 's',
				production: true,
				fetchImpl: ko,
			})
		).toBe(false)
		expect(
			await verifyTurnstile('', {
				secret: 's',
				production: true,
				fetchImpl: ok,
			})
		).toBe(false)
	})
})

describe('clientIp', () => {
	it('retient la dernière entrée de X-Forwarded-For (ajoutée par Traefik)', () => {
		expect(
			clientIp(new Headers({ 'x-forwarded-for': '6.6.6.6, 1.2.3.4' }))
		).toBe('1.2.3.4')
		expect(clientIp(new Headers(), 'socket')).toBe('socket')
	})
})
