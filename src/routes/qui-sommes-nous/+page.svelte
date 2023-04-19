<script>
	import Header from '../Components/Header.svelte'
</script>

<!-- SEO PAGE -->
<Header />
<main
	class="z-50 flex min-h-[calc(100vh-100px)] w-full flex-col items-center
     gap-0 px-[10%] py-[200px] xl:flex-row xl:px-[10%] 2xl:pointer-events-auto 2xl:static
     2xl:z-10 2xl:translate-y-0 2xl:select-auto 2xl:gap-[50px] 2xl:bg-transparent 2xl:px-[250px] 2xl:py-[100px] 2xl:opacity-100"
>
	<div class="w-full xl:w-1/2">
		<h1 class="xs:text-7xl mb-4 text-5xl font-bold">
			Communauté d'artistes et d'artisans&nbsp;:&nbsp;créateurs d'œuvres d'art
			uniques en édition limitée
		</h1>
		<p class="text-md xs:text-lg mb-6">
			Notre communauté est composée d'artistes et d'artisans indépendants,
			passionnés par la création d'œuvres d'art uniques. Chacune de nos pièces
			est réalisée avec soin et expertise, reflétant l'inspiration et la
			créativité de son créateur. Nous croyons en l'originalité et
			l'authenticité, et ne proposons que des œuvres en édition limitée et en
			une seule copie.
		</p>
		<p class="text-md xs:text-lg mb-6">
			Nous sommes également engagés dans la protection de l'environnement et la
			responsabilité sociale. Nous utilisons des matériaux durables et recyclés
			dans nos créations, minimisant notre impact sur l'environnement. Nous
			soutenons les artistes émergents et les écoles d'art pour encourager la
			diversité dans notre communauté.
		</p>
		<p class="text-md xs:text-lg mb-6">
			Chez nous, la créativité est une expérience collective, où chaque artiste
			et artisan contribue à l'inspiration et au processus créatif de la
			communauté. Nous cherchons à créer des œuvres d'art uniques reflétant
			notre vision et notre philosophie de vie. Nous croyons que l'art est un
			moyen puissant d'expression et de critique sociale, et encourageons nos
			artistes à s'engager dans des questions de société et de politique à
			travers leurs créations.
		</p>
		<p class="text-md xs:text-lg">
			Nous sommes ravis de vous accueillir dans notre communauté d'artistes et
			d'artisans passionnés. Découvrez nos créations uniques et exprimez votre
			propre personnalité à travers l'art.
		</p>
	</div>
	<div class="flex flex w-full items-center justify-center lg:w-1/2">
		<div
			class="flex flex-col items-center justify-center lg:px-[10%] xl:px-[20%] 2xl:p-0"
		>
			<div class="relative border-[3px] border-[#D1AC8A]">
				<!--                        outline div around the image -->
				<div
					class="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform
                        outline-double outline-[10px] outline-offset-[15px] outline-[#D1AC8A]"
				/>
				<!--                        image on the front -->
				<img
					id="firstImage"
					class="md:[h-500px] h-[350px] w-[300px] object-cover 2xl:h-[600px] 2xl:w-[450px]"
					alt="art personnalisé"
					src="/resources/Andy_C._A_visually_stunning_and_intriguing_image_that_provides__222fda6c-94e2-4c9a-b056-5c0cf1f16bb3.webp"
				/>
				<!--                        image on the back -->
				<img
					src="/resources/star.svg"
					alt="stars"
					class="absolute right-0 top-0 h-[70px] w-[70px] translate-x-[145%] transform"
				/>
			</div>
		</div>
	</div>
</main>
