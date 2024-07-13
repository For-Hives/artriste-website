import { json } from '@sveltejs/kit'
import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'

import PocketBase from 'pocketbase'

const pb = new PocketBase('https://api.artriste.cc')

const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: '2022-11-15',
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function POST({ request }) {
	const data = await request.json()
	console.log('data', data)
	const paymentIntent = await stripe.paymentIntents.create({
		amount: data.amount * 100,
		currency: data.currency,
		description: data.description,
		payment_method_types: ['card'],
	})

	return json({
		clientSecret: paymentIntent.client_secret,
	})
}
