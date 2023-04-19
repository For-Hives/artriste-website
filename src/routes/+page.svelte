<script>
	import { oeuvres } from '/src/utils/store.ts'
	import { api_origin } from '/src/utils/const.ts'
	import Header from './Components/Header.svelte'
	import { onMount } from 'svelte'

	let oeuvresValue = []
	let images = ['/favicon.webp', '/favicon.webp']
	let titles = ['Artriste']
	let dates = ['2023']
	let prices = [199]
	let descriptions = [
		"Le Co-fondateur, LightIn vous proposes une collection d'oeuvres d'art uniques et originales, disponibles à l'achat en quantité ultra-limitée. Chaque oeuvre est produite en une seule unité, ce qui signifie que vous en serez le seul et unique propriétaire. Découvrez notre sélection d'oeuvres d'art exclusives et exprimez votre personnalité à travers l'art",
	]
	let authors = ['LightIn']

	onMount(async () => {
		oeuvres.subscribe(value => {
			oeuvresValue = value
			images = oeuvresValue.map(
				record =>
					api_origin +
					record.collectionId +
					'/' +
					record.id +
					'/' +
					record.image
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
	})

	let count = 0

	let valueToDisplay = 0
	let valueToDisplay_Alt = 1

	let flagAnimation = false
	let skewFlagAnimation = false

	// get the list of images in directory assets/images/art

	// on click on the button, change images to the next one
	const handleNextImage = () => {
		flagAnimation = true
		skewFlagAnimation = true

		// with 300ms delay
		setTimeout(() => {
			flagAnimation = false

			if (count === images.length - 1) {
				count = 0
				valueToDisplay = 0
				valueToDisplay_Alt = 1
			} else {
				valueToDisplay = count + 1
				if (count === images.length - 2) {
					valueToDisplay_Alt = 0
				} else {
					valueToDisplay_Alt = count + 2
				}
				count++
			}
		}, 300)
		setTimeout(() => {
			skewFlagAnimation = false
		}, 1000)
	}

	//     auto change image every 5s
	setInterval(() => {
		handleNextImage()
	}, 5000)

	// change the title, author and date on the load of the page
	onMount(() => {
		setTimeout(() => {
			flagAnimation = false
		}, 300)
	})
</script>

<div class="App relative min-h-screen w-screen">
	<Header />
	<!--     main mage -->
	<main
		class="z-10 flex h-full min-h-screen w-full flex-col justify-center
        px-[20px] py-[40px] 2xl:min-h-[calc(100vh-100px)] 2xl:p-0"
	>
		<section
			class="relative flex h-full w-full flex-col gap-[50px] 2xl:flex-row 2xl:px-[250px]"
		>
			<div
				class="flex h-full w-full flex-col justify-between gap-[50px] pt-[100px]
            2xl:min-h-[70vh] 2xl:w-[40%] 2xl:justify-center"
			>
				<div class="flex h-full flex-col justify-center">
					<!--                    Catch phrase -->
					<h1 class="text-[36px] font-bold text-[#D1AC8A] 2xl:text-[46px]">
						Collection exclusive d'œuvres d'art uniques.
					</h1>
					<!--                    Little description of the website goal -->
					<p class="text-[16px] text-slate-300 2xl:text-[20px]">
						Nous proposons des œuvres d'art uniques et originales, disponibles à
						l'achat en quantité ultra-limitée. Chaque œuvre est produite en une
						seule unité, ce qui signifie que vous en serez le seul et unique
						propriétaire. Découvrez notre sélection d'œuvres d'art exclusives et
						exprimez votre personnalité à travers l'art.
					</p>
				</div>
				<!--                Title desktop part ( changed by javasript on the load of the page ) -->
				<div class="hidden flex-col 2xl:flex">
					<h2 class="flex items-center">
						<span
							id="title"
							class="font-square text-[30px] leading-tight text-[#D1AC8A] transition-all
                              duration-300 2xl:text-[50px] {flagAnimation
								? '-z-10 opacity-0'
								: ''}"
						>
							{titles[valueToDisplay]}
						</span>
					</h2>
					<!--                    Author desktop part ( changed by javascript on the load of the poge too ) -->
					<div
						id="authorNameContainer"
						class="mt-[30px] flex flex-col transition-all
                    duration-300 2xl:mt-[50px] 2xl:flex-row 2xl:justify-around"
					>
						<span
							id="authorName"
							class="font-square text-[30px] transition-all duration-300 {flagAnimation
								? '-z-10 opacity-0'
								: ''}"
						>
							{authors[valueToDisplay]}
						</span>
						<!--                        Date desktop part ( changed by javascript on the load of the page too ) -->
						<span
							id="date"
							class="font-square text-[30px] font-bold text-[#D1AC8A]
                        transition-all duration-300 {flagAnimation
								? '-z-10 opacity-0'
								: ''}"
						>
							{dates[valueToDisplay]}
						</span>
					</div>
				</div>
			</div>
			<!--            Buttons to go on the next / prev draw -->
			<!--            <div class="absolute bottom-0 left-0 w-full w-full 2xl:w-[60%] flex flex-row-reverse-->
			<!--            2xl:static 2xl:bottom-auto 2xl:left-auto 2xl:flex-row-reverse items-start 2xl:items-end justify-start gap-[30px] z-60">-->
			<!--                &lt;!&ndash;        {/*  button to go to the next image ( arrow ) */}&ndash;&gt;-->
			<!--                <button class="flex flex-col justify-center items-start gap-[5px]" on:click={handleClick}>-->
			<!--                    <span class="leading-none m-0 p-0 custom-button-text">next</span>-->
			<!--                    <img src="/resources/arrow.svg" alt="arrow"-->
			<!--                         class="w-[30px] 2xl:w-[75px] m-0 p-0"/>-->
			<!--                    <span class="leading-none m-0 p-0 custom-button-text">next</span>-->
			<!--                </button>-->
			<!--                &lt;!&ndash;        {/* Prev btn */}&ndash;&gt;-->
			<!--                <button class="flex flex-col justify-center items-start gap-[5px]" on:click={handleClickPrev}>-->
			<!--                    <span class="leading-none m-0 p-0 custom-button-text">prev</span>-->
			<!--                    <img src="/resources/arrow-prev.svg" alt="arrow"-->
			<!--                         class="w-[30px] 2xl:w-[75px] m-0 p-0"/>-->
			<!--                    <span class="leading-none m-0 p-0 custom-button-text">prev</span>-->
			<!--                </button>-->
			<!--            </div>-->
			<!--    {/* main part of the art displayed  */}-->
			<div
				id="main"
				class="z-30 flex transform flex-col transition-all duration-500 lg:mt-[50px] 2xl:static 2xl:absolute
            2xl:left-[60%] 2xl:top-1/2 2xl:mt-0 2xl:-translate-x-1/2 2xl:-translate-y-1/2"
			>
				<div class="flex flex-col items-center justify-center px-[20%] 2xl:p-0">
					<div
						class="relative rounded-full border-[#D1AC8A] transition-all duration-500 {!flagAnimation
							? 'border-[3px] '
							: 'border-[0px] border-[#fff]'}"
					>
						<!--                        outline div around the image -->
						<div
							class="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform
                        rounded-full outline-double outline-[10px] outline-offset-[15px] outline-[#D1AC8A]"
						/>
						<a
							href="/galerie"
							id="add_to_cart"
							class="absolute -right-[20%] top-0 z-50 flex flex-col items-center justify-center"
						>
							<img
								src="/resources/button-cart.svg"
								alt="add to cart"
								class="h-[125px] w-[125px] 2xl:h-[150px] 2xl:w-[150px]"
							/>
						</a>
						<!-- the circle that used around the main image -->
						<!-- the tips for this is on the duplication of the main image, with css mask with the same tips used in photohshop -->
						<!-- ( all the black masked is displayed and all  the white is undisplayed from the screen -->
						<div
							id="skew-circle"
							class="z-5 skew-circle absolute bottom-0 left-1/2 h-[250px]
                             w-[250px] rounded-full border-[3px] border-slate-300 transition-all duration-500 2xl:h-[350px] 2xl:w-[350px] {skewFlagAnimation
								? ' skew-circle-fade'
								: ''}"
						/>
						<!--                        image on the front -->
						<img
							id="firstImage"
							class="custom-z-index z-11 duration-250 absolute left-1/2 top-1/2
                        h-[350px] w-[300px] -translate-x-1/2 -translate-y-1/2 transform rounded-full object-cover transition-all 2xl:h-[600px] 2xl:w-[350px] {flagAnimation
								? ' -z-10 scale-50 opacity-0'
								: ''}"
							alt={titles[valueToDisplay]}
							src={images[valueToDisplay]}
						/>
						<!--                        image on the back -->
						<img
							id="firstImageCover"
							class="duration-250 h-[350px] w-[300px] rounded-full object-cover transition-all 2xl:h-[600px] 2xl:w-[350px] {flagAnimation
								? ' scale-50 opacity-0'
								: ''}"
							alt={titles[valueToDisplay]}
							src={images[valueToDisplay]}
						/>
						<img
							src="/resources/star.svg"
							alt="stars"
							class="absolute left-0 top-0 h-[70px] w-[70px] -translate-x-[135%] transform"
						/>
					</div>
				</div>
				<!--    {/* second part ( mobile ) */}-->
				<div
					class="pointer-events-none -z-10 flex select-none flex-col pt-[50px] 2xl:hidden"
				>
					<h2 class="flex items-center">
						<!--                        the title on mobile view undisplayed on desktop view, change by javascript when the page is loaded -->
						<span
							id="mobile-title"
							class="font-square text-[50px] font-bold leading-tight text-[#D1AC8A] transition-all
                              duration-300 2xl:text-[140px] {flagAnimation
								? '-z-10 opacity-0'
								: ''}"
						>
							{titles[valueToDisplay]}
						</span>
					</h2>
					<div
						id="mobile-authorNameContainer"
						class="mt-[30px] flex flex-col transition-all duration-300 2xl:mt-[50px]
                         2xl:flex-row 2xl:justify-around {flagAnimation
							? '-z-10 opacity-0'
							: ''}"
					>
						<!--                        the author Name on mobile view undisplayed on desktop view, change by javascript when the page is loaded -->
						<span
							id="mobile-authorName"
							class="font-square text-[30px] transition-all duration-300 {flagAnimation
								? '-z-10 opacity-0'
								: ''}"
						>
							{authors[valueToDisplay]}
						</span>
						<!--                        the date on mobile view undisplayed on desktop view, change by javascript when the page is loaded -->
						<span
							id="mobile-date"
							class="font-square text-[30px] font-bold text-[#D1AC8A] transition-all duration-300 {flagAnimation
								? '-z-10 opacity-0'
								: ''}"
						>
							{dates[valueToDisplay]}
						</span>
					</div>
				</div>
			</div>
			<!--    {/* Secondary part - next image */}-->
			<!--            the next image displayed by this section, undisplayed on mobile view -->
			<div
				id="secondary-container"
				class="absolute left-[65%] top-[65%] z-10 hidden -translate-x-1/2 -translate-y-1/2 transform
                 opacity-25 transition-all duration-300 2xl:left-[75%] 2xl:top-1/3 2xl:flex 2xl:scale-75 {flagAnimation
					? '-z-10 opacity-0'
					: ''}"
			>
				<div
					id="secondary"
					class="flex flex-col items-center justify-center transition-all duration-500 {flagAnimation
						? '-z-10 opacity-0'
						: ''}"
				>
					<div class="relative">
						<div
							class="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform
                        rounded-full outline-double outline-[10px] outline-offset-[15px] outline-[#D1AC8A]"
						/>
						<img
							id="secondaryImage"
							class="h-[250px] w-[250px] rounded-full object-cover transition-all 2xl:h-[600px] 2xl:w-[350px]
                             {flagAnimation
								? '-translate-x-3/4 translate-y-1/4 scale-150 opacity-0 duration-500'
								: 'duration-0'}"
							alt={titles[valueToDisplay_Alt]}
							src={images[valueToDisplay_Alt]}
						/>
					</div>
				</div>
			</div>
		</section>
	</main>
</div>
