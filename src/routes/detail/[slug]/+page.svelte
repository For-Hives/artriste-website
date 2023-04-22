<script>
	import { api_origin, product_infos } from '/src/utils/const'
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
		class="relative mx-auto grid gap-10 p-5 py-12 pt-36 sm:m-auto sm:max-w-2xl lg:max-w-7xl lg:grid-cols-12 2xl:gap-20 2xl:pt-12"
	>
		<!-- Breadcrumbs -->
		<div class="col-span-12 flex items-center justify-start">
			<nav aria-label="Breadcrumb" class="">
				<ol class="flex items-center space-x-2">
					<li
						v-for="(breadcrumb, breadcrumbIdx) in product.breadcrumbs"
						:key="breadcrumb.id"
					>
						<div class="flex items-center text-3xl">
							<a
								href="/galerie"
								class="font-large text-gray-500 hover:text-gray-300">Galerie</a
							>
							<svg
								v-if="breadcrumbIdx !== product.breadcrumbs.length - 1"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								class="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
							>
								<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
							</svg>
							<span class="ml-2 font-bold">
								{oeuvre.name}
							</span>
						</div>
					</li>
				</ol>
			</nav>
		</div>

		<div class="relative col-span-12 grid gap-20 lg:grid-cols-12">
			<!--		Buy now btn -->
			<section
				aria-labelledby="options-heading"
				class="absolute bottom-0 right-0"
			>
				<form on:submit|preventDefault={submit}>
					<div class="mt-5 flex items-center justify-between">
						<input
							type="submit"
							value="Acheter"
							class="hover: flex items-center justify-center rounded-md border-2 border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
						/>
					</div>
				</form>
			</section>

			<!-- Product image -->
			<div class="col-span-6 lg:mt-0 lg:self-center">
				<div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
					<img
						src={api_origin +
							oeuvre.collectionId +
							'/' +
							oeuvre.id +
							'/' +
							oeuvre.image}
						alt="image de l'oeuvre"
						class="h-full w-full object-cover object-center"
					/>
				</div>
			</div>

			<!-- Product details -->
			<div class="col-span-6 mt-0 flex flex-col justify-center gap-8 lg:mt-8">
				<section aria-labelledby="information-heading" class="">
					<div class="flex items-center">
						<div class="flex h-[20px] w-[20px] items-center justify-center">
							<svg
								height="512"
								viewBox="0 0 520 520"
								width="512"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g id="_15-Checked" data-name="15-Checked">
									<path
										d="m210.516 424.937-2.239-3.815c-34.2-58.27-125.082-181.928-126-183.17l-1.311-1.781 30.963-30.6 98.012 68.439c61.711-80.079 119.283-135.081 156.837-167.2 41.081-35.135 67.822-51.31 68.092-51.465l.608-.364h52.522l-5.017 4.468c-129.029 114.926-268.883 359.19-270.276 361.644z"
										fill="#fff"
									/>
								</g>
							</svg>
						</div>
						<div class="flex items-center">
							<p class="ml-2 text-sm text-gray-400">En stock</p>
						</div>
					</div>
				</section>
				<div class="relative">
					<h1
						class="tracking-loose text-3xl font-medium text-white sm:text-7xl"
					>
						{oeuvre.name}
					</h1>
				</div>
				<div class="flex items-center justify-start">
					<h3 class="text-3xl">{oeuvre.price} €</h3>
				</div>
				<div class="border-t border-gray-200/30 py-10">
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

		<!-- Product form (description) -->
		<div class="col-span-12 m-10 mx-0 sm:m-10 lg:m-20 2xl:m-0">
			<div class="flex flex-col gap-8">
				<div class="relative">
					<div
						class="absolute left-0 top-0 h-[100px] w-[100px] -translate-y-[50px] transform text-white opacity-25 sm:-translate-x-[50px]"
					>
						<svg
							version="1.1"
							id="Capa_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							width="95.333px"
							height="95.332px"
							viewBox="0 0 95.333 95.332"
							style="enable-background:new 0 0 95.333 95.332;"
							xml:space="preserve"
							class="h-full w-full fill-current"
						>
							<g>
								<g>
									<path
										d="M30.512,43.939c-2.348-0.676-4.696-1.019-6.98-1.019c-3.527,0-6.47,0.806-8.752,1.793
										c2.2-8.054,7.485-21.951,18.013-23.516c0.975-0.145,1.774-0.85,2.04-1.799l2.301-8.23c0.194-0.696,0.079-1.441-0.318-2.045
										s-1.035-1.007-1.75-1.105c-0.777-0.106-1.569-0.16-2.354-0.16c-12.637,0-25.152,13.19-30.433,32.076
										c-3.1,11.08-4.009,27.738,3.627,38.223c4.273,5.867,10.507,9,18.529,9.313c0.033,0.001,0.065,0.002,0.098,0.002
										c9.898,0,18.675-6.666,21.345-16.209c1.595-5.705,0.874-11.688-2.032-16.851C40.971,49.307,36.236,45.586,30.512,43.939z"
									/>
									<path
										d="M92.471,54.413c-2.875-5.106-7.61-8.827-13.334-10.474c-2.348-0.676-4.696-1.019-6.979-1.019
										c-3.527,0-6.471,0.806-8.753,1.793c2.2-8.054,7.485-21.951,18.014-23.516c0.975-0.145,1.773-0.85,2.04-1.799l2.301-8.23
										c0.194-0.696,0.079-1.441-0.318-2.045c-0.396-0.604-1.034-1.007-1.75-1.105c-0.776-0.106-1.568-0.16-2.354-0.16
										c-12.637,0-25.152,13.19-30.434,32.076c-3.099,11.08-4.008,27.738,3.629,38.225c4.272,5.866,10.507,9,18.528,9.312
										c0.033,0.001,0.065,0.002,0.099,0.002c9.897,0,18.675-6.666,21.345-16.209C96.098,65.559,95.376,59.575,92.471,54.413z"
									/>
								</g>
							</g>
						</svg>
					</div>
					<p
						class="text-left text-sm text-gray-50 first:first-letter:text-7xl [&>*]:italic [&>*]:text-gray-50"
					>
						{@html oeuvre.description}
					</p>
					<div
						class="absolute bottom-0 right-0 h-[100px] w-[100px] translate-y-[50px] -scale-x-100 transform text-white opacity-25 sm:translate-x-[50px]"
					>
						<svg
							version="1.1"
							id="Capa_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							x="0px"
							y="0px"
							width="95.333px"
							height="95.332px"
							viewBox="0 0 95.333 95.332"
							style="enable-background:new 0 0 95.333 95.332;"
							xml:space="preserve"
							class="h-full w-full fill-current"
						>
							<g>
								<g>
									<path
										d="M30.512,43.939c-2.348-0.676-4.696-1.019-6.98-1.019c-3.527,0-6.47,0.806-8.752,1.793
										c2.2-8.054,7.485-21.951,18.013-23.516c0.975-0.145,1.774-0.85,2.04-1.799l2.301-8.23c0.194-0.696,0.079-1.441-0.318-2.045
										s-1.035-1.007-1.75-1.105c-0.777-0.106-1.569-0.16-2.354-0.16c-12.637,0-25.152,13.19-30.433,32.076
										c-3.1,11.08-4.009,27.738,3.627,38.223c4.273,5.867,10.507,9,18.529,9.313c0.033,0.001,0.065,0.002,0.098,0.002
										c9.898,0,18.675-6.666,21.345-16.209c1.595-5.705,0.874-11.688-2.032-16.851C40.971,49.307,36.236,45.586,30.512,43.939z"
									/>
									<path
										d="M92.471,54.413c-2.875-5.106-7.61-8.827-13.334-10.474c-2.348-0.676-4.696-1.019-6.979-1.019
										c-3.527,0-6.471,0.806-8.753,1.793c2.2-8.054,7.485-21.951,18.014-23.516c0.975-0.145,1.773-0.85,2.04-1.799l2.301-8.23
										c0.194-0.696,0.079-1.441-0.318-2.045c-0.396-0.604-1.034-1.007-1.75-1.105c-0.776-0.106-1.568-0.16-2.354-0.16
										c-12.637,0-25.152,13.19-30.434,32.076c-3.099,11.08-4.008,27.738,3.629,38.225c4.272,5.866,10.507,9,18.528,9.312
										c0.033,0.001,0.065,0.002,0.099,0.002c9.897,0,18.675-6.666,21.345-16.209C96.098,65.559,95.376,59.575,92.471,54.413z"
									/>
								</g>
							</g>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
