import { json } from '@sveltejs/kit'
import Stripe from 'stripe'
import PocketBase from 'pocketbase'
import { SECRET_STRIPE_KEY } from '$env/static/private'
import { env } from '$env/dynamic/private'
import { dev } from '$app/environment'
import {
	LIMITS,
	clientIp,
	createCheckoutIntent,
	createLimiter,
	verifyTurnstile,
} from '$lib/server/checkout.js'

const pb = new PocketBase('https://api.artriste.cc')

const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: '2022-11-15',
})

const perIp = createLimiter(LIMITS.perIp)
const global = createLimiter(LIMITS.global)

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, getClientAddress }) {
	let body
	try {
		body = await request.json()
	} catch {
		return json({ error: 'Requête illisible' }, { status: 400 })
	}

	const result = await createCheckoutIntent(
		body,
		clientIp(request.headers, getClientAddress()),
		{
			getOeuvre: async id => {
				try {
					return await pb.collection('oeuvre').getOne(id)
				} catch {
					return null
				}
			},
			createIntent: params => stripe.paymentIntents.create(params),
			verifyToken: token =>
				verifyTurnstile(token, {
					secret: env.TURNSTILE_SECRET_KEY,
					production: !dev,
				}),
			perIp,
			global,
			log: line => console.warn(line),
		}
	)

	return json(result.body, { status: result.status })
}
