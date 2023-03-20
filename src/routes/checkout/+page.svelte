<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { Elements, PaymentElement, LinkAuthenticationElement, Address } from '/src/lib';
	import Header from '../Components/Header.svelte';
	import { api_origin } from '../../utils/const';

	/** @type {import("../../../.svelte-kit/types/src/routes").PageData} */
	export let data;

	let stripe = null;
	let clientSecret = null;
	let error = null;
	let elements;
	let processing = false;
	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
		// create payment intent server side
		clientSecret = await createPaymentIntent();
	});

	async function createPaymentIntent() {
		const response = await fetch('/checkout/intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				amount: data.oeuvre.price,
				currency: 'eur',
				id: data.oeuvre.id,
				description: data.oeuvre.name
			})
		});
		const { clientSecret } = await response.json();
		return clientSecret;
	}

	async function submit() {
		// avoid processing duplicates
		if (processing) return;
		processing = true;
		// confirm payment with stripe
		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required'
		});
		// log results, for debugging
		console.log({ result });
		if (result.error) {
			// payment failed, notify user
			error = result.error;
			processing = false;
		} else {
			// payment succeeded, redirect to "thank you" page
			await goto('/checkout/success');
		}
	}
</script>

<Header />
<!--  tailwind layout -->
<div class="flex flex-col-reverse sm:flex-row w-screen p-0 ">
	<div class="flex flex-col w-full justify-center items-center  ">
		<div
			class="w-full sm:w-1/2 px-4 py-6 space-y-6 bg-white border-2 border-gray-300 rounded-md shadow-md sm:px-6 lg:px-8"
		>
			<div>
				<h1 class="text-3xl font-bold text-center text-red-500">Page de paiement</h1>
			</div>

			{#if error}
				<p class="error">{error.message} Please try again.</p>
			{/if}
			{#if stripe && clientSecret}
				<Elements
					{stripe}
					{clientSecret}
					theme="flat"
					labels="floating"
					variables={{ colorPrimary: '#7c4dff' }}
					rules={{ '.Input': { border: 'solid 1px #0002' } }}
					bind:elements
				>
					<form on:submit|preventDefault={submit}>
						<LinkAuthenticationElement />
						<PaymentElement />
						<Address mode="billing" />

						<!--                        beatifull tailwind pay button -->
						<button
							disabled={processing}
							class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 my-4 px-4 rounded"
						>
							{#if processing}
								Processing...
							{:else}
								Pay
							{/if}
						</button>
					</form>
				</Elements>
			{:else}
				Loading...
			{/if}
		</div>
	</div>
	<div class=" w-full flex flex-col justify-center items-center h-screen sm:h-fit ">
		{#if data.oeuvre}
			<!--        tailwind image centered -->

			<p class="font-bold py-3">{data.oeuvre.name}</p>

			<img
				src={api_origin + data.oeuvre.collectionId + '/' + data.oeuvre.id + '/' + data.oeuvre.image}
				alt="image de l'oeuvre"
				class="  w-3/4    object-cover object-center rounded-2xl"
			/>

			<div class="flex flex-col  items-baseline py-4">
				<p>- poster de oeuvre</p>
				<p>- certificat d'authenticité</p>
			</div>

			<!--            arrow to scroll down -->
			<div class="flex flex-col items-center my-4 sm:hidden ">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 animate-bounce"
					fill="none"
					viewBox="0 0 24 24"
					stroke="white"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					/>
				</svg>
			</div>
		{/if}
	</div>
</div>
<!--<h1 class="text-3xl font-bold text-center">-->
<!--    Page de paiement</h1>-->

<!--{#if data.oeuvre}-->
<!--    <p> OEUVRE : {data.oeuvre.name}</p>-->
<!--{/if}-->

<!--{#if error}-->
<!--    <p class="error">{error.message} Please try again.</p>-->
<!--{/if}-->

<!--{#if stripe && clientSecret}-->
<!--    <Elements-->
<!--            {stripe}-->
<!--            {clientSecret}-->
<!--            theme="flat"-->
<!--            labels="floating"-->
<!--            variables={{ colorPrimary: '#7c4dff' }}-->
<!--            rules={{ '.Input': { border: 'solid 1px #0002' } }}-->
<!--            bind:elements-->
<!--    >-->
<!--        <form on:submit|preventDefault={submit}>-->
<!--            <LinkAuthenticationElement/>-->
<!--            <PaymentElement/>-->
<!--            <Address mode="billing"/>-->

<!--            <button disabled={processing}>-->
<!--                {#if processing}-->
<!--                    Processing...-->
<!--                {:else}-->
<!--                    Pay-->
<!--                {/if}-->
<!--            </button>-->
<!--        </form>-->
<!--    </Elements>-->
<!--{:else}-->
<!--    Loading...-->
<!--{/if}-->
