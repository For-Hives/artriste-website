<script>
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { loadStripe } from '@stripe/stripe-js'
	import { PUBLIC_STRIPE_KEY } from '$env/static/public'
	import {
		Elements,
		PaymentElement,
		LinkAuthenticationElement,
		Address,
	} from '/src/lib'
	import Header from '../Components/Header.svelte'
	import { api_origin, product_infos } from '../../utils/const'

	/** @type {import('../../../.svelte-kit/types/src/routes').PageData} */
	export let data

	let stripe = null
	let clientSecret = null
	let error = null
	let elements
	let processing = false
	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY)
		// create payment intent server side
		clientSecret = await createPaymentIntent()
	})

	async function createPaymentIntent() {
		const response = await fetch('/checkout/intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				amount: data.oeuvre.price,
				currency: 'eur',
				id: data.oeuvre.id,
				description: data.oeuvre.name,
			}),
		})
		const { clientSecret } = await response.json()
		return clientSecret
	}

	async function submit() {
		// avoid processing duplicates
		if (processing) return
		processing = true
		// confirm payment with stripe
		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required',
		})
		// // log results, for debugging
		// console.log({ result })
		if (result.error) {
			// payment failed, notify user
			error = result.error
			processing = false
		} else {
			// payment succeeded, redirect to "thank you" page
			await goto('/checkout/success')
		}
	}
</script>

<Header />

<div class="relative flex min-h-[calc(100vh-100px)] w-screen items-center">
	<div
		class="rotate-30 absolute left-0 top-0 -z-10 h-screen w-screen -translate-x-1/2 -translate-y-1/3 select-none opacity-5"
	>
		<svg
			height="512"
			viewBox="0 0 24 24"
			width="512"
			xmlns="http://www.w3.org/2000/svg"
			class="h-full w-full fill-current"
		>
			<path
				d="m5 3a2 2 0 1 1 -2-2 2 2 0 0 1 2 2zm-2 7a1 1 0 1 0 -1-1 1 1 0 0 0 1 1zm0 6a1 1 0 1 0 -1-1 1 1 0 0 0 1 1zm0 3a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm6-18a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm1 8a1 1 0 1 0 -1 1 1 1 0 0 0 1-1zm-1 4a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm0 7a1 1 0 1 0 1 1 1 1 0 0 0 -1-1zm6-16a1 1 0 1 0 -1-1 1 1 0 0 0 1 1zm0 3a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm1 8a1 1 0 1 0 -1 1 1 1 0 0 0 1-1zm-1 4a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm6-14a2 2 0 1 0 -2-2 2 2 0 0 0 2 2zm-1 4a1 1 0 1 0 1-1 1 1 0 0 0 -1 1zm1 4a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm0 7a1 1 0 1 0 1 1 1 1 0 0 0 -1-1z"
			/>
		</svg>
	</div>
	<div
		class="relative mx-auto flex flex-col gap-10 p-0 py-12 pt-36 sm:m-auto sm:grid sm:max-w-2xl sm:p-5 sm:py-12 sm:pt-36 lg:max-w-7xl lg:grid-cols-12 2xl:gap-10 2xl:pt-12"
	>
		<div
			class="relative col-span-12 mx-5 flex flex-col gap-20 sm:mx-0 sm:grid lg:grid-cols-12"
		>
			<!-- Product image -->
			<div class="col-span-6 lg:mt-0 lg:self-start">
				<div class="relative mb-8 flex items-center justify-between">
					<h1
						class="tracking-loose text-3xl font-medium text-white sm:text-7xl"
					>
						{data.oeuvre.name}
					</h1>
					<h3 class="text-3xl">{data.oeuvre.price} €</h3>
				</div>
				<div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
					<img
						src={api_origin +
							data.oeuvre.collectionId +
							'/' +
							data.oeuvre.id +
							'/' +
							data.oeuvre.image}
						alt="image de l'oeuvre"
						class="h-full w-full object-cover object-center"
					/>
				</div>
				<div class="mt-8 flex items-center justify-start" />
			</div>

			<!-- Product details -->
			<div class="col-span-6 mt-0 flex flex-col justify-center gap-8 lg:mt-8">
				<div class="flex w-full flex-col items-center justify-center">
					<div
						class="w-full space-y-6 rounded-md bg-white px-4 py-6 shadow-md shadow-xl sm:px-6 lg:px-8"
					>
						{#if error}
							<p class="error font-semibold text-gray-500">
								{error.message} Please try again.
							</p>
						{/if}
						{#if stripe && clientSecret}
							<Elements
								{stripe}
								{clientSecret}
								theme="flat"
								labels="floating"
								variables={{ colorPrimary: '#4338CA' }}
								rules={{ '.Input': { border: 'solid 1px #0002' } }}
								bind:elements
							>
								<form on:submit|preventDefault={submit}>
									<LinkAuthenticationElement />
									<PaymentElement />
									<Address mode="billing" />

									<!-- beatifull tailwind pay button -->
									<button
										disabled={processing}
										class="my-4 w-full rounded bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-900"
									>
										{#if processing}
											Chargement...
										{:else}
											Payer
										{/if}
									</button>
								</form>
							</Elements>
						{:else}
							<span class="font-semibold text-gray-500"> Loading... </span>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- Product details -->
		<div class="col-span-12 mt-0 flex flex-col justify-center gap-8">
			<div>
				<h3 class="text-3xl font-medium text-gray-50">
					Informations supplémentaires
				</h3>
				<div class="prose prose-sm mt-4 text-gray-500">
					<ul role="list" class="flex flex-col gap-2 pb-10 sm:pb-0">
						{#each product_infos as product_info}
							<li class="ml-4 text-sm">→ {product_info}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
