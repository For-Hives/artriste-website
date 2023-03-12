<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { loadStripe } from "@stripe/stripe-js";
  import { PUBLIC_STRIPE_KEY } from "$env/static/public";
  import { Elements, PaymentElement, LinkAuthenticationElement, Address } from "/src/lib";

  /** @type {import("./$types").PageData} */
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
    const response = await fetch("/payment/intent", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({})
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
      redirect: "if_required"
    });
    // log results, for debugging
    console.log({ result });
    if (result.error) {
      // payment failed, notify user
      error = result.error;
      processing = false;
    } else {
      // payment succeeded, redirect to "thank you" page
      goto("/payment/success");
    }
  }
</script>

<h1>Page de paiement</h1>


{#if data.oeuvre}
  <p> OEUVRE : {data.oeuvre.name}</p>
{/if}

{#if error}
  <p className="error">{error.message} Please try again.</p>
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

      <button disabled={processing}>
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

