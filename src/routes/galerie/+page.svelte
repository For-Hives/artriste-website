<script>
	import Header from '../Components/Header.svelte'
	import { oeuvres } from '/src/utils/store.ts'
	import { api_origin } from '/src/utils/const.ts'

	let oeuvresValue = []
	let images = ['/favicon.webp', '/favicon.webp']
	let titles = ['Artriste']
	let dates = ['2023']
	let prices = [199]
	let descriptions = [
		"Le Co-fondateur, LightIn vous proposes une collection d'oeuvres d'art uniques et originales, disponibles à l'achat en quantité ultra-limitée. Chaque oeuvre est produite en une seule unité, ce qui signifie que vous en serez le seul et unique propriétaire. Découvrez notre sélection d'oeuvres d'art exclusives et exprimez votre personnalité à travers l'art",
	]
	let authors = ['LightIn']

	oeuvres.subscribe(value => {
		oeuvresValue = value
		images = oeuvresValue.map(
			record =>
				api_origin + record.collectionId + '/' + record.id + '/' + record.image
		)
		titles = oeuvresValue.map(record => record.name)
		// format date to the year
		dates = oeuvresValue.map(record => record.date.split('-')[0])
		prices = oeuvresValue.map(
			record =>
				record.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €'
		)
		descriptions = oeuvresValue.map(record => record.description)
		authors = oeuvresValue.map(record => record.author)
	})
</script>

<Header />
<div class="App relative min-h-screen w-screen">
	<main
		class="z-50 flex
     w-full flex-col items-center gap-0 px-[50px] py-[100px] lg:px-[100px] lg:py-[100px] 2xl:pointer-events-auto 2xl:static 2xl:z-10 2xl:translate-y-0
     2xl:select-auto 2xl:flex-row 2xl:gap-[50px] 2xl:bg-transparent 2xl:px-[250px] 2xl:py-0 2xl:opacity-100"
	>
		<div
			class="grid grid-cols-1 gap-x-6 gap-y-10 py-[100px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16 xl:grid-cols-4"
		>
			{#each oeuvresValue as item, index}
				<!-- mailto:contact@artriste.cc , precomplete with title of the article -->
				<a href="/detail/{item.name}" class="group text-sm">
					<div
						class="aspect-w-1 aspect-h-1 relative w-full overflow-hidden transition transition-all duration-300 group-hover:opacity-75"
					>
						<img
							src={images[index]}
							alt={titles[index]}
							class="group h-full w-full object-cover object-center"
						/>
						<div class="overflow-hidden">
							<!--          date on right corner -->
							<p
								class="absolute right-0 top-0 rounded-bl-lg bg-gray-900 px-2 py-1 text-xs font-medium text-white"
							>
								{dates[index]}
							</p>
							<!--             CTA on hover the image, on bottom middle of the image -->
							<p
								class="absolute bottom-0 left-0 right-0 mx-[30px] translate-y-[30px] transform bg-gray-900 px-2 py-1 text-center text-xs
                            font-medium text-white opacity-0 transition transition-all duration-300 group-hover:translate-y-[-10px] group-hover:opacity-100"
							>
								Je suis intéressé !
							</p>
						</div>
					</div>
					<h3 class="mt-4 text-5xl font-bold text-gray-100">{titles[index]}</h3>
					<p class="my-4 italic text-gray-400">{prices[index]}</p>
					<p class="my-1 italic text-gray-200">
						{@html descriptions[index].slice(0, 250)}...
					</p>
					<p class="mt-2 font-medium text-gray-100">
						{authors[index]}
					</p>
				</a>
			{/each}
		</div>
	</main>
</div>
