import { json } from "@sveltejs/kit";
import Stripe from "stripe";
import { SECRET_STRIPE_KEY } from "$env/static/private";

const stripe = new Stripe(SECRET_STRIPE_KEY, {
  apiVersion: "2022-11-15"
});


export async function POST() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: "EUR",
    automatic_payment_methods: {
      enabled: true
    }
  });

  return json({
    clientSecret: paymentIntent.client_secret
  });
}