/**
 * Création du PaymentIntent Stripe d'une œuvre, sans confiance dans le navigateur.
 *
 * Avant : la route prenait `amount`, `currency` et `description` dans le corps de la requête. N'importe qui pouvait
 * payer une œuvre 1 €, ou créer des PaymentIntents à volonté pour tester des cartes volées (frais Stripe, Radar,
 * risque de suspension du compte).
 *
 * Maintenant : seul l'identifiant de l'œuvre est lu. Le prix et le nom sont relus dans PocketBase, la devise est
 * fixée à l'euro, et la création est freinée (par adresse IP, au total) et protégée par Cloudflare Turnstile.
 */

/** Identifiant d'un enregistrement PocketBase : 15 caractères minuscules ou chiffres. */
const RECORD_ID = /^[a-z0-9]{15}$/

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/** Freins : un acheteur réel crée un ou deux intents ; un script de test de cartes en crée des centaines. */
export const LIMITS = {
	perIp: { max: 5, windowMs: 10 * 60_000 },
	global: { max: 60, windowMs: 60 * 60_000 },
}

/**
 * Limiteur en mémoire à fenêtre glissante (instance unique sur Coolify).
 * @param {{ max: number, windowMs: number }} limit
 */
export function createLimiter({ max, windowMs }) {
	/** @type {Map<string, number[]>} */
	const hits = new Map()
	return {
		/** @param {string} key @param {number} now */
		take(key, now = Date.now()) {
			const recent = (hits.get(key) ?? []).filter(t => now - t < windowMs)
			if (recent.length >= max) {
				hits.set(key, recent)
				return false
			}
			recent.push(now)
			hits.set(key, recent)
			if (hits.size > 10_000) {
				for (const [k, v] of hits)
					if (v.every(t => now - t >= windowMs)) hits.delete(k)
			}
			return true
		},
	}
}

/**
 * Adresse du client. artriste.cc n'est pas derrière le proxy Cloudflare : Traefik (Coolify) ajoute l'adresse réelle
 * en DERNIER dans X-Forwarded-For. Les entrées précédentes viennent du client et peuvent être inventées.
 * @param {Headers} headers
 * @param {string} [fallback]
 */
export function clientIp(headers, fallback = 'unknown') {
	const forwarded = headers.get('x-forwarded-for')
	const last = forwarded?.split(',').at(-1)?.trim()
	return last || fallback
}

/**
 * Vérification côté serveur d'un jeton Turnstile (widget « artriste.cc checkout »).
 * Sans secret : refus en production (une variable oubliée ne doit pas rouvrir la route), ignorée ailleurs.
 * @param {unknown} token
 * @param {{ secret?: string, production: boolean, fetchImpl?: typeof fetch }} options
 */
export async function verifyTurnstile(
	token,
	{ secret, production, fetchImpl = fetch }
) {
	if (!secret) return !production
	if (typeof token !== 'string' || !token || token.length > 2048) return false
	try {
		const res = await fetchImpl(VERIFY_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({ secret, response: token }),
			signal: AbortSignal.timeout(10_000),
		})
		const data = await res.json()
		return data?.success === true
	} catch {
		return false
	}
}

/**
 * @typedef {{ id: string, name: string, price: number }} Oeuvre
 * @typedef {{
 *   getOeuvre: (id: string) => Promise<Oeuvre | null>,
 *   createIntent: (params: { amount: number, currency: 'eur', description: string, metadata: Record<string, string>, payment_method_types: string[] }) => Promise<{ client_secret: string | null }>,
 *   verifyToken: (token: unknown) => Promise<boolean>,
 *   perIp: ReturnType<typeof createLimiter>,
 *   global: ReturnType<typeof createLimiter>,
 *   log?: (line: string) => void,
 * }} CheckoutDeps
 */

/**
 * @param {unknown} body corps JSON de la requête (seuls `id` et `turnstileToken` sont lus)
 * @param {string} ip
 * @param {CheckoutDeps} deps
 * @returns {Promise<{ status: number, body: Record<string, unknown> }>}
 */
export async function createCheckoutIntent(body, ip, deps) {
	const log = deps.log ?? (() => {})
	const id =
		body && typeof body === 'object'
			? /** @type {Record<string, unknown>} */ (body).id
			: undefined
	const token =
		body && typeof body === 'object'
			? /** @type {Record<string, unknown>} */ (body).turnstileToken
			: undefined

	if (typeof id !== 'string' || !RECORD_ID.test(id)) {
		return { status: 400, body: { error: 'Œuvre inconnue' } }
	}

	if (!deps.perIp.take(ip) || !deps.global.take('global')) {
		log('[checkout] trop de créations de paiement : refus 429')
		return {
			status: 429,
			body: { error: 'Trop de tentatives, réessayez dans quelques minutes.' },
		}
	}

	if (!(await deps.verifyToken(token))) {
		log('[checkout] vérification anti-robot refusée')
		return {
			status: 403,
			body: { error: "La vérification anti-robot n'a pas abouti." },
		}
	}

	const oeuvre = await deps.getOeuvre(id)
	const price = Number(oeuvre?.price)
	if (!oeuvre || !Number.isFinite(price) || price <= 0) {
		return { status: 404, body: { error: 'Œuvre inconnue' } }
	}

	const intent = await deps.createIntent({
		amount: Math.round(price * 100),
		currency: 'eur',
		description: String(oeuvre.name ?? '').slice(0, 200),
		metadata: { oeuvre_id: oeuvre.id },
		payment_method_types: ['card'],
	})
	return { status: 200, body: { clientSecret: intent.client_secret } }
}
