<script>
	import { api_origin } from '/src/utils/const'
	import { goto } from '$app/navigation'
	import Header from '../../Components/Header.svelte'

	/** @type {import('./$types').PageData} */
	export let data

	const oeuvre = data.oeuvre
	let processing = false

	async function submit() {
		// avoid processing duplicates

		if (processing) return
		processing = true

		// payment succeeded, redirect to "thank you" page
		goto('/checkout?oeuvre=' + oeuvre.id)
	}

	const products = [
		'Uniquement les meilleurs matériaux',
		'Fabriqué avec amour et passion',
		'Original, exemplaire unique',
		'Fabriqué en France',
		'Objet de collection',
	]
</script>

<Header />

<div class='w-screen'>
	<div
		class='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-[50px]'
	>
		<div class=''>
			<nav aria-label='Breadcrumb' class='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<ol class='flex items-center space-x-4'>
					<li
						v-for='(breadcrumb, breadcrumbIdx) in product.breadcrumbs'
						:key='breadcrumb.id'
					>
						<div class='flex items-center text-2xl'>
							<a
								href='/galerie'
								class='text-3xl font-medium text-gray-500 mr-4 '>Galerie</a
							>
							<svg viewBox='0 0 6 20' aria-hidden='true' class='h-5 w-auto text-gray-300'>
								<path d='M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z' fill='currentColor' />
							</svg>
						</div>
					</li>
					<li class='text-3xl font-medium text-gray-50'>
						{oeuvre.name}
					</li>
				</ol>
			</nav>
		</div>
		<div class='mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
			<div class='lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8'>
				<div class='lg:col-span-5 lg:col-start-8'>
					<div class='flex justify-between'>
						<h1 class='text-4xl font-bold text-gray-50'>{oeuvre.name}</h1>
						<p class='text-2xl font-medium text-gray-50'>{oeuvre.price} €</p>
					</div>
				</div>
				<div class='mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0'>
					<h2 class='sr-only'>Images</h2>

					<div class='grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8'>
						<img
							key={oeuvre.id}
							src={api_origin +
									oeuvre.collectionId +
									'/' +
									oeuvre.id +
									'/' +
									oeuvre.image}
							alt="image de l'oeuvre"
							class={'col-span-2 row-span-2 block rounded-lg'}
						/>
					</div>
				</div>
				<div class='mt-10'>
					<h2 class='text-sm font-medium text-gray-900'>Description</h2>
					<div
						class='prose prose-sm mt-4 text-gray-500'>
						{@html oeuvre.description}
					</div>
				</div>

				<div class='mt-8 border-t border-gray-200 pt-8'>
					<h2 class='text-sm font-medium text-gray-900'>Fabric &amp; Care</h2>

					<div class='prose prose-sm mt-4 text-gray-500'>
						<ul role='list'>
								<li v-for='(item) in products'>
									<span>item</span>
								</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!--		&lt;!&ndash; Product image &ndash;&gt;-->
		<!--		<div class='mt-10 lg:col-start-1 lg:row-span-2 lg:mt-0 lg:self-center'>-->
		<!--			<div class='aspect-w-1 aspect-h-1 overflow-hidden rounded-lg'>-->
		<!--				<img-->
		<!--					src={api_origin +-->
		<!--						oeuvre.collectionId +-->
		<!--						'/' +-->
		<!--						oeuvre.id +-->
		<!--						'/' +-->
		<!--						oeuvre.image}-->
		<!--					alt="image de l'oeuvre"-->
		<!--					class='h-full w-full object-cover object-center'-->
		<!--				/>-->
		<!--			</div>-->
		<!--		</div>-->

		<!-- Product details -->
		<div class='lg:max-w-lg lg:self-end hidden'>


			<!--			<div class='mt-4'>-->
			<!--				<h1 class='text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl'>-->
			<!--					{oeuvre.name}-->
			<!--				</h1>-->
			<!--			</div>-->

			<section aria-labelledby='information-heading' class='mt-4'>
				<h2 id='information-heading' class='sr-only'>Product information</h2>

				<div class='mt-4 space-y-6'>
					<p class='text-base text-gray-600'>
						{@html oeuvre.description}
					</p>
				</div>
				<div class='mt-6 flex items-center'>
					<p class='ml-2 text-sm text-gray-400'>En stock</p>
				</div>
			</section>
		</div>

		<!-- Product form -->
		<div class='mt-10 lg:col-start-2 lg:row-start-2 lg:max-w-lg lg:self-start hidden'>
			<section aria-labelledby='options-heading'>
				<h2 id='options-heading' class='sr-only'>Product options</h2>
				<h3 class='text-xl'>{oeuvre.price} €</h3>
				<form on:submit|preventDefault={submit}>
					<div class='mt-5'>
						<input
							type='submit'
							value='Acheter'
							class='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
						/>
					</div>
				</form>
			</section>
		</div>
	</div>
</div>
