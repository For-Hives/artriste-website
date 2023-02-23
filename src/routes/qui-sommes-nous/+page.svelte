<script>
    import Header from "../Components/Header.svelte";
</script>

<!-- SEO PAGE -->
<Header/>
<main class="w-full py-[200px] px-[10%] xl:px-[10%] 2xl:static min-h-[calc(100vh-100px)]
     2xl:bg-transparent 2xl:opacity-100 2xl:translate-y-0 flex flex-col xl:flex-row 2xl:px-[250px]
     gap-0 2xl:gap-[50px] 2xl:py-[100px] z-50 2xl:z-10 2xl:select-auto 2xl:pointer-events-auto items-center">
    <div class="w-full xl:w-1/2">
        <h1 class="text-5xl xs:text-7xl font-bold mb-4">Communauté d'artistes et d'artisans&nbsp;:&nbsp;créateurs d'œuvres d'art uniques en édition limitée</h1>
        <p class="text-md xs:text-lg mb-6">Notre communauté est composée d'artistes et d'artisans indépendants, passionnés par la création d'œuvres d'art uniques. Chacune de nos pièces est
            réalisée avec soin et expertise, reflétant l'inspiration et la créativité de son créateur. Nous croyons en l'originalité et l'authenticité, et ne proposons que des
            œuvres
            en édition limitée et en une seule copie.</p>
        <p class="text-md xs:text-lg mb-6">Nous sommes également engagés dans la protection de l'environnement et la responsabilité sociale. Nous utilisons des matériaux durables et recyclés
            dans
            nos créations, minimisant notre impact sur l'environnement. Nous soutenons les artistes émergents et les écoles d'art pour encourager la diversité dans notre
            communauté.</p>
        <p class="text-md xs:text-lg mb-6">Chez nous, la créativité est une expérience collective, où chaque artiste et artisan contribue à l'inspiration et au processus créatif de la
            communauté.
            Nous cherchons à créer des œuvres d'art uniques reflétant notre vision et notre philosophie de vie. Nous croyons que l'art est un moyen puissant d'expression et de
            critique
            sociale, et encourageons nos artistes à s'engager dans des questions de société et de politique à travers leurs créations.</p>
        <p class="text-md xs:text-lg">Nous sommes ravis de vous accueillir dans notre communauté d'artistes et d'artisans passionnés. Découvrez nos créations uniques et exprimez votre propre
            personnalité à travers l'art.</p>
    </div>
    <div class="flex w-full lg:w-1/2 flex items-center justify-center">
        <div class="flex flex-col items-center justify-center lg:px-[10%] xl:px-[20%] 2xl:p-0">
            <div class="relative border-[3px] border-[#D1AC8A]">
                <!--                        outline div around the image -->
                <div class="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        outline-[10px] outline-offset-[15px] outline-double outline-[#D1AC8A]">
                </div>
                <!--                        image on the front -->
                <img id="firstImage"
                     class="object-cover w-[300px] h-[350px] 2xl:w-[450px] md:[h-500px] 2xl:h-[600px]"
                     alt="art personnalisé" src="/resources/Andy_C._A_visually_stunning_and_intriguing_image_that_provides__222fda6c-94e2-4c9a-b056-5c0cf1f16bb3.webp"/>
                <!--                        image on the back -->
                <img src="/resources/star.svg" alt="stars"
                     class="absolute h-[70px] w-[70px] top-0 right-0 transform translate-x-[145%]"/>
            </div>
        </div>

    </div>
</main>
