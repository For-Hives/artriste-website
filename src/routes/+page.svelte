<script>
    import {oeuvres} from "/src/utils/store.ts";
    import {api_origin} from "/src/utils/const.ts";
    import Header from "./Components/Header.svelte";
    import { onMount } from 'svelte'
    // import Header from "./Components/Header.svelte";

    let oeuvresValue=[];
    let images=[];
    let titles=[];
    let dates=[];
    let prices=[];
    let descriptions=[];
    let authors=[];

    onMount(async () => {
        oeuvres.subscribe(value => {
            oeuvresValue = value;
            // get size of the viewport, depending on the size, change the image size
            const width = window.innerWidth;
            let size = 0;
            if (width < 768) {
                size = "100x0";
            } else if (width < 1024) {
                size = "150x0";
            } else if (width < 1280) {
                size = "200x0";
            } else if (width < 1536) {
                size = "250x0";
            } else {
                size = "300x0";
            }
            images = oeuvresValue.map(record => api_origin + record.collectionId + "/" + record.id + "/" + record.image + "?thumb=" + size);
            titles = oeuvresValue.map(record => record.name);
            // format date to the year
            dates = oeuvresValue.map(record => record.date.split("-")[0]);
            prices = oeuvresValue.map(record => record.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €");
            descriptions = oeuvresValue.map(record => record.description);
            authors = oeuvresValue.map(record => record.author);
        });
    })


    let flag = false;
    let count = 0;
    let cartItemCount = 0;

    let valueToDisplay = 0;
    let valueToDisplay_Alt = 1;

    let flagAnimation = false;

    // get the list of images in directory assets/images/art

    // on click on the button, change images to the next one
    const handleClick = () => {
        flag = true;
        handleClickPrevNext(flag);

        // with 300ms delay
        setTimeout(() => {
            flag = false;
            handleClickPrevNext(flag);

            if (count === images.length - 1) {
                count = 0;
                valueToDisplay = 0;
                valueToDisplay_Alt = 1;
            } else {
                valueToDisplay = count + 1;
                if (count === images.length - 2) {
                    valueToDisplay_Alt = 0;
                } else {
                    valueToDisplay_Alt = count + 2;
                }
                count++;
            }
        }, 300);
    }
    // same as handleClick but for the previous button
    const handleClickPrev = () => {
        flag = true;
        handleClickPrevNext(flag);

        // with 300ms delay
        setTimeout(() => {
            flag = false;
            handleClickPrevNext(flag);

            // increment count
            if (count === 0) {
                count = images.length - 1;

                valueToDisplay = images.length - 1;
                valueToDisplay_Alt = 0;
            } else {
                valueToDisplay = count - 1;
                valueToDisplay_Alt = count;

                count--;
            }
        }, 300);
    }


    /**
     * true on next, false on prev
     * @param enabler
     */
    function handleClickPrevNext(enabler) {
        if (enabler) {
            flagAnimation = true;
        } else {
            flagAnimation = false;
        }
    }

</script>


<div class="relative min-h-screen w-screen App">
    <Header/>
    <!--     main mage -->
    <main
            class="w-full h-full flex flex-col justify-center min-h-screen 2xl:min-h-[calc(100vh-100px)]
        px-[20px] py-[40px] 2xl:p-0 z-10">
        <section class="w-full h-full flex flex-col 2xl:flex-row relative 2xl:px-[250px] gap-[50px]">
            <div class="w-full h-full 2xl:w-[40%] 2xl:min-h-[70vh] flex flex-col gap-[50px]
            justify-between pt-[100px] 2xl:justify-center">
                <div class="flex flex-col h-full justify-center">
                    <!--                    Catch phrase -->
                    <h1 class="text-[36px] 2xl:text-[40px] text-[#D1AC8A]">
                        Collection exclusive d'œuvres d'art uniques.
                    </h1>
                    <!--                    Little description of the website goal -->
                    <p class="text-[16px] 2xl:text-[20px] text-slate-300">
                        Nous proposons des œuvres d'art uniques et originales, disponibles à l'achat en quantité ultra-limitée.
                        Chaque œuvre est produite en une seule unité, ce qui signifie que vous en serez le seul et unique propriétaire.
                        Découvrez notre sélection d'œuvres d'art exclusives et exprimez votre personnalité à travers l'art.
                    </p>
                </div>
                <!--                Title desktop part ( changed by javasript on the load of the page ) -->
                <div class="hidden 2xl:flex flex-col">
                    <h2 class="flex items-center">
                        <span id="title"
                              class="font-square text-[50px] 2xl:text-[100px] leading-tight font-bold text-[#D1AC8A]
                              transition-all duration-300 {flagAnimation ? 'opacity-0 -z-10' : ''}">
                            {titles[valueToDisplay]}
                        </span>
                    </h2>
                    <!--                    Author desktop part ( changed by javascript on the load of the poge too ) -->
                    <div id="authorNameContainer" class="flex flex-col 2xl:flex-row 2xl:justify-around
                    mt-[30px] 2xl:mt-[50px] transition-all duration-300">
                        <span id="authorName"
                              class="font-square text-[30px] transition-all duration-300 {flagAnimation ? 'opacity-0 -z-10' : ''}">
                            {authors[valueToDisplay]}
                        </span>
                        <!--                        Date desktop part ( changed by javascript on the load of the page too ) -->
                        <span id="date" class="font-square text-[30px] font-bold text-[#D1AC8A]
                        transition-all duration-300 {flagAnimation ? 'opacity-0 -z-10' : ''}">
                            {dates[valueToDisplay]}
                        </span>
                    </div>
                </div>
            </div>
            <!--            Buttons to go on the next / prev draw -->
            <div class="absolute bottom-0 left-0 w-full 2xl:w-[60%] flex flex-col-reverse
            2xl:static 2xl:bottom-auto 2xl:left-auto 2xl:flex-row-reverse items-end justify-start gap-[30px] z-30">
                <!--        {/*  button to go to the next image ( arrow ) */}-->
                <button class="flex flex-col justify-center items-start gap-[5px]" on:click={handleClick}>
                    <span class="leading-none m-0 p-0 custom-button-text">next</span>
                    <img src="./src/resources/arrow.svg" alt="arrow"
                         class="w-[30px] 2xl:w-[75px] m-0 p-0"/>

                    <span class="leading-none m-0 p-0 custom-button-text">next</span>
                </button>
                <!--        {/* Prev btn */}-->
                <button class="flex flex-col justify-center items-start gap-[5px]" on:click={handleClickPrev}>
                    <span class="leading-none m-0 p-0 custom-button-text">prev</span>
                    <img src="./src/resources/arrow-prev.svg" alt="arrow"
                         class="w-[30px] 2xl:w-[75px] m-0 p-0"/>
                    <span class="leading-none m-0 p-0 custom-button-text">prev</span>
                </button>
            </div>
            <!--    {/* main part of the art displayed  */}-->
            <div id="main" class="flex flex-col 2xl:static 2xl:absolute 2xl:top-1/2 2xl:left-[60%] z-30
            transform 2xl:-translate-y-1/2 2xl:-translate-x-1/2 transition-all duration-500 {flagAnimation ? 'opacity-0 -z-10 -scale-x-100' : ''}">
                <div class="flex flex-col items-center justify-center px-[20%] 2xl:p-0">
                    <div class="relative border-[3px] border-[#D1AC8A] rounded-full">
                        <!--                        outline div around the image -->
                        <div class="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        outline-[10px] outline-offset-[15px] outline-double outline-[#D1AC8A] rounded-full">
                        </div>
                        <button id="add_to_cart" class="flex flex-col justify-center items-center absolute top-0 -right-[20%] z-50"
                                value="1">
                            <img src="./src/resources/button-cart.svg"
                                 alt="add to cart"
                                 class="w-[125px] 2xl:w-[150px] h-[125px] 2xl:h-[150px]"/>
                        </button>
                        <!-- the circle that used around the main image -->
                        <!-- the tips for this is on the duplication of the main image, with css mask with the same tips used in photohshop -->
                        <!-- ( all the black masked is displayed and all  the white is undisplayed from the screen -->
                        <div id="skew-circle"
                             class="w-[250px] 2xl:w-[350px] h-[250px] 2xl:h-[350px] border-[3px] border-slate-300
                             rounded-full absolute bottom-0 left-1/2 z-5 skew-circle transition-all duration-500 {flagAnimation ? 'opacity-0' : ''}">
                        </div>
                        <!--                        image on the front -->
                        <img id="firstImage"
                             class="object-cover w-[300px] 2xl:w-[350px] h-[350px] 2xl:h-[600px] rounded-full
                        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 custom-z-index"
                             alt="{titles[valueToDisplay]}" src="{images[valueToDisplay]}"/>
                        <!--                        image on the back -->
                        <img id="firstImageCover"
                             class="object-cover w-[300px] 2xl:w-[350px] h-[350px] 2xl:h-[600px] rounded-full"
                             alt="{titles[valueToDisplay]}" src="{images[valueToDisplay]}"/>
                        <img src="/src/resources/star.svg" alt="stars"
                             class="absolute h-[70px] w-[70px] top-0 left-0 transform -translate-x-[135%]"/>
                    </div>
                </div>
                <!--    {/* second part ( mobile ) */}-->
                <div class="flex flex-col -z-10 select-none pointer-events-none 2xl:hidden ">
                    <h2 class="flex items-center">
                        <!--                        the title on mobile view undisplayed on desktop view, change by javascript when the page is loaded -->
                        <span id="mobile-title"
                              class="font-square text-[50px] 2xl:text-[140px] leading-tight font-bold text-[#D1AC8A]
                              transition-all duration-300 {flagAnimation ? 'opacity-0 -z-10' : ''}">
                            {titles[valueToDisplay]}
                        </span>
                    </h2>
                    <div id="mobile-authorNameContainer"
                         class="flex flex-col 2xl:flex-row 2xl:justify-around mt-[30px] 2xl:mt-[50px]
                         transition-all duration-300 {flagAnimation ? 'opacity-0 -z-10' : ''}">
                        <!--                        the author Name on mobile view undisplayed on desktop view, change by javascript when the page is loaded -->
                        <span id="mobile-authorName"
                              class="font-square text-[30px] transition-all duration-300 {flagAnimation ? 'opacity-0 -z-10' : ''}">
                            {authors[valueToDisplay]}
                        </span>
                        <!--                        the date on mobile view undisplayed on desktop view, change by javascript when the page is loaded -->
                        <span id="mobile-date"
                              class="font-square text-[30px] font-bold text-[#D1AC8A] transition-all duration-300 {flagAnimation ? 'opacity-0 -z-10' : ''}">
                            {dates[valueToDisplay]}
                        </span>
                    </div>
                </div>
            </div>
            <!--    {/* Secondary part - next image */}-->
            <!--            the next image displayed by this section, undisplayed on mobile view -->
            <div id="secondary-container"
                 class="hidden 2xl:flex absolute top-[65%] left-[65%] 2xl:top-1/3 2xl:left-[75%] transform
                 -translate-y-1/2 -translate-x-1/2 2xl:scale-75 opacity-25 z-10 transition-all duration-300 {flagAnimation ? 'opacity-0 -z-10' : ''}">
                <div id="secondary"
                     class="flex justify-center items-center flex-col transition-all duration-500 {flagAnimation ? 'opacity-0 -z-10' : ''}">
                    <div class="relative">
                        <div class="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        outline-[10px] outline-offset-[15px] outline-double outline-[#D1AC8A] rounded-full">
                        </div>
                        <img id="secondaryImage"
                             class="object-cover w-[250px] 2xl:w-[350px] h-[250px] 2xl:h-[600px] rounded-full"
                             alt="{titles[valueToDisplay_Alt]}" src="{images[valueToDisplay_Alt]}"/>
                    </div>
                </div>
            </div>
        </section>
    </main>
</div>
