<script>
    import {oeuvres} from "/src/utils/store.ts";
    import {api_origin} from "/src/utils/const.ts";
    import Header from "./Components/Header.svelte";
    // import Header from "./Components/Header.svelte";

    let oeuvresValue;
    let images;
    let titles;
    let dates;
    let prices;
    let descriptions;
    let authors;

    oeuvres.subscribe(value => {
        oeuvresValue = value;
        images = oeuvresValue.map(record => api_origin + record.collectionId + "/" + record.id + "/" + record.image);
        titles = oeuvresValue.map(record => record.name);
        // format date to the year
        dates = oeuvresValue.map(record => record.date.split("-")[0]);
        prices = oeuvresValue.map(record => record.price);
        descriptions = oeuvresValue.map(record => record.description);
        authors = oeuvresValue.map(record => record.author);

        console.log(oeuvresValue);
    });


    // get all values of the current page, values that will be changed automaticaly
    // const content_burgerContainer = document.getElementById('burger-container');
    // const content_navigation = document.getElementById('navigation');
    // const content_title = document.getElementById('title');
    // const content_authorName = document.getElementById('authorName');
    // const content_authorNameContainer = document.getElementById('authorNameContainer');
    // const content_date = document.getElementById('date');
    // const content_mobile_title = document.getElementById('mobile-title');
    // const content_mobile_authorName = document.getElementById('mobile-authorName');
    // const content_mobile_authorNameContainer = document.getElementById('mobile-authorNameContainer');
    // const content_mobile_date = document.getElementById('mobile-date');
    // const content_main = document.getElementById('main');
    // const content_skewCircle = document.getElementById('skew-circle');
    // const content_secondaryContainer = document.getElementById('secondary-container');
    // const content_secondary = document.getElementById('secondary');
    // const content_firstImage = document.getElementById('firstImage');
    // const content_firstImageCover = document.getElementById('firstImageCover');
    // const content_secondaryImage = document.getElementById('secondaryImage');
    // const content_add_to_cart = document.getElementById('add_to_cart');

    // todo get all button to add cart
    // let add_to_carts_buttons = [];
    // <?php
    //     //        todo function in php to get all buttons
    //     ?>

    let flag = false;
    let count = 0;
    let cartItemCount = 0;
    // get the list of images in directory assets/images/art

    // image link for the main image
    // content_firstImage.src = images[0];
    // content_firstImageCover.src = images[0];
    // content_secondaryImage.src = images[1];

    // and title, date, author
    // content_title.innerHTML = titles[0];
    // content_mobile_title.innerHTML = titles[0];
    //
    // content_date.innerHTML = dates[0];
    // content_mobile_date.innerHTML = dates[0];
    //
    // content_authorName.innerHTML = author;
    // content_mobile_authorName.innerHTML = author;

    // // on click on the button, change images to the next one
    // const handleClick = () => {
    //     flag = true;
    //     handleClickPrevNext(flag);
    //
    //     // with 300ms delay
    //     setTimeout(() => {
    //         flag = false;
    //         handleClickPrevNext(flag);
    //
    //         if (count === images.length - 1) {
    //             count = 0;
    //             // set on last image
    //             content_firstImage.src = images[0];
    //             content_firstImageCover.src = images[0];
    //             // set on first image
    //             content_secondaryImage.src = images[1];
    //             // and title, date, author
    //             content_title.innerHTML = titles[0];
    //             content_mobile_title.innerHTML = titles[0];
    //
    //             content_date.innerHTML = dates[0];
    //             content_mobile_date.innerHTML = dates[0];
    //
    //             content_authorName.innerHTML = author;
    //             content_mobile_authorName.innerHTML = author;
    //         } else {
    //             content_firstImage.src = images[count + 1];
    //             content_firstImageCover.src = images[count + 1];
    //             if (count === images.length - 2) {
    //                 content_secondaryImage.src = images[0];
    //             } else {
    //                 content_secondaryImage.src = images[count + 1 + 1];
    //             }
    //             // and title, date, author
    //             content_title.innerHTML = titles[count + 1];
    //             content_mobile_title.innerHTML = titles[count + 1];
    //
    //             content_date.innerHTML = dates[count + 1];
    //             content_mobile_date.innerHTML = dates[count + 1];
    //
    //             content_authorName.innerHTML = author;
    //             content_mobile_authorName.innerHTML = author;
    //
    //             count++;
    //         }
    //     }, 300);
    // }
    // // same as handleClick but for the previous button
    // const handleClickPrev = () => {
    //     flag = true;
    //     handleClickPrevNext(flag);
    //
    //     // with 300ms delay
    //     setTimeout(() => {
    //
    //         flag = false;
    //         handleClickPrevNext(flag);
    //
    //         // increment count
    //         if (count === 0) {
    //             count = images.length - 1;
    //             // set on last image
    //             content_firstImage.src = images[images.length - 1];
    //             content_firstImageCover.src = images[images.length - 1];
    //             // set on first image
    //             content_secondaryImage.src = images[0];
    //             // and title, date, author
    //             content_title.innerHTML = titles[images.length - 1];
    //             content_mobile_title.innerHTML = titles[images.length - 1];
    //             content_date.innerHTML = dates[images.length - 1];
    //             content_mobile_date.innerHTML = dates[images.length - 1];
    //             content_authorName.innerHTML = author;
    //             content_mobile_authorName.innerHTML = author;
    //         } else {
    //             content_firstImage.src = images[count - 1];
    //             content_firstImageCover.src = images[count - 1];
    //             content_secondaryImage.src = images[count];
    //
    //             content_title.innerHTML = titles[count - 1];
    //             content_mobile_title.innerHTML = titles[count - 1];
    //             content_date.src = dates[count - 1];
    //             content_mobile_date.src = dates[count - 1];
    //             content_authorName.src = author;
    //             content_authorNameContainer.src = author;
    //
    //             count--;
    //         }
    //     }, 300);
    // }


    // /**
    //  * true on next, false on prev
    //  * @param enabler
    //  */
    // function handleClickPrevNext(enabler) {
    //     if (enabler) {
    //         // on title div change these classes
    //         // add : opacity-0 -z-10
    //         content_title.classList.add('opacity-0', '-z-10');
    //         // on authorName div change these classes
    //         // add : opacity-0 -z-10
    //         content_authorName.classList.add('opacity-0', '-z-10');
    //         // on date div change these classes
    //         // add : opacity-0 -z-10
    //         content_date.classList.add('opacity-0', '-z-10');
    //         // on authorNameContainer div change these classes
    //         // add : opacity-0 -z-10
    //         content_authorNameContainer.classList.add('opacity-0', '-z-10');
    //
    //         // on mobile-title div change these classes
    //         // add : opacity-0 -z-10
    //         content_mobile_title.classList.add('opacity-0', '-z-10');
    //         // on mobile-authorName div change these classes
    //         // add : opacity-0 -z-10
    //         content_mobile_authorName.classList.add('opacity-0', '-z-10');
    //         // on mobile-date div change these classes
    //         // add : opacity-0 -z-10
    //         content_mobile_date.classList.add('opacity-0', '-z-10');
    //         // on mobile-authorNameContainer div change these classes
    //         // add : opacity-0 -z-10
    //         content_mobile_authorNameContainer.classList.add('opacity-0', '-z-10');
    //
    //         // on main div change these classes
    //         // add : opacity-0 -z-10 -scale-x-100
    //         content_main.classList.add('opacity-0', '-z-10', '-scale-x-100');
    //         // on skew-circle div change these classes
    //         // add : opacity-0
    //         content_skewCircle.classList.add('opacity-0')
    //
    //         // on secondary div change these classes
    //         // add : opacity-0 -z-10
    //         content_secondary.classList.add('opacity-0', '-z-10');
    //         // on secondary-container div change these classes
    //         // add : opacity-0 -z-10
    //         content_secondaryContainer.classList.add('opacity-0', '-z-10');
    //     } else {
    //         // on title div change these classes
    //         // remove : opacity-0 -z-10
    //         content_title.classList.remove('opacity-0', '-z-10');
    //         // on authorName div change these classes
    //         // remove : opacity-0 -z-10
    //         content_authorName.classList.remove('opacity-0', '-z-10');
    //         // on date div change these classes
    //         // remove : opacity-0 -z-10
    //         content_date.classList.remove('opacity-0', '-z-10');
    //         // on authorNameContainer div change these classes
    //         // remove : opacity-0 -z-10
    //         content_authorNameContainer.classList.remove('opacity-0', '-z-10');
    //
    //         // on mobile-title div change these classes
    //         // remove : opacity-0 -z-10
    //         content_mobile_title.classList.remove('opacity-0', '-z-10');
    //         // on mobile-authorName div change these classes
    //         // remove : opacity-0 -z-10
    //         content_mobile_authorName.classList.remove('opacity-0', '-z-10');
    //         // on mobile-date div change these classes
    //         // remove : opacity-0 -z-10
    //         content_mobile_date.classList.remove('opacity-0', '-z-10');
    //         // on mobile-authorNameContainer div change these classes
    //         // remove : opacity-0 -z-10
    //         content_mobile_authorNameContainer.classList.remove('opacity-0', '-z-10');
    //
    //         // on main div change these classes
    //         // remove : opacity-0 -z-10 -scale-x-100
    //         content_main.classList.remove('opacity-0', '-z-10', '-scale-x-100');
    //         // on skew-circle div change these classes
    //         // remove : opacity-0
    //         content_skewCircle.classList.remove('opacity-0');
    //
    //         // on secondary div change these classes
    //         // remove : opacity-0 -z-10
    //         content_secondary.classList.remove('opacity-0', '-z-10');
    //         // on secondary-container div change these classes
    //         // remove : opacity-0 -z-10
    //         content_secondaryContainer.classList.remove('opacity-0', '-z-10');
    //     }
    // }

    // content_burgerContainer.addEventListener('click', () => {
    //     flagBurger = !flagBurger;
    //     if (flagBurger) {
    //         content_burgerContainer.classList.add('burger-active');
    //         // on navigation div change these classes
    //         // possibly add : bg-custom
    //         // add : opacity-100 translate-y-0 select-auto pointer-events-auto
    //         // remove : opacity-0 -translate-y-[100vh] select-none pointer-events-none
    //         content_navigation.classList.add('opacity-100', 'translate-y-0', 'select-auto',
    //             'pointer-events-auto', 'bg-custom');
    //         content_navigation.classList.remove('opacity-0', '-translate-y-[100vh]',
    //             'select-none', 'pointer-events-none');
    //     } else {
    //         content_burgerContainer.classList.remove('burger-active');
    //         // on navigation div change these classes
    //         // remove : opacity-100 translate-y-0 select-auto pointer-events-auto bg-custom
    //         // add : opacity-0 -translate-y-[100vh] select-none pointer-events-none
    //         content_navigation.classList.remove('opacity-100', 'translate-y-0',
    //             'select-auto', 'pointer-events-auto', 'bg-custom');
    //         content_navigation.classList.add('opacity-0', '-translate-y-[100vh]', 'select-none', 'pointer-events-none');
    //     }
    // });

    // content_add_to_cart.addEventListener('click', () => {
    //     //     todo count the number of the cart
    //     cartItemCount++;
    //     //     add to cart by this button
    //     let value = content_add_to_cart.attributes().value;
    //     //     todo click on the correct button
    //     add_to_carts_buttons[value].click();
    //     content_add_to_cart.innerHTML = cartItemCount;
    // })
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
                        Une collection d'art unique !
                    </h1>
                    <!--                    Little description of the website goal -->
                    <p class="text-[16px] 2xl:text-[20px] text-slate-300">
                        Des oeuvres d'art uniques et originales, vente à l'unité, ultra limité. Vous serez le seul et
                        unique
                        propriétaire de votre oeuvre !
                    </p>
                </div>
                <!--                Title desktop part ( changed by javasript on the load of the page ) -->
                <div class="hidden 2xl:flex flex-col">
                    <h2 class="flex items-center">
                        <span id="title"
                              class="font-square text-[50px] 2xl:text-[100px] leading-tight font-bold text-[#D1AC8A]
                              transition-all duration-300">
                            {titles[0]}
                        </span>
                    </h2>
                    <!--                    Author desktop part ( changed by javascript on the load of the poge too ) -->
                    <div id="authorNameContainer" class="flex flex-col 2xl:flex-row 2xl:justify-around
                    mt-[30px] 2xl:mt-[50px] transition-all duration-300">
                        <span id="authorName"
                              class="font-square text-[30px] transition-all duration-300">
                            {authors[0]}
                        </span>
                        <!--                        Date desktop part ( changed by javascript on the load of the page too ) -->
                        <span id="date" class="font-square text-[30px] font-bold text-[#D1AC8A]
                        transition-all duration-300">
                            {dates[0]}
                        </span>
                    </div>
                </div>
            </div>
            <!--            Buttons to go on the next / prev draw -->
            <div class="absolute bottom-0 left-0 w-full 2xl:w-[60%] flex flex-col-reverse
            2xl:static 2xl:bottom-auto 2xl:left-auto 2xl:flex-row-reverse items-end justify-start gap-[30px] z-30">
                <!--        {/*  button to go to the next image ( arrow ) */}-->
                <button class="flex flex-col justify-center items-start gap-[5px]">
<!--                        onclick="handleClick()">-->
                    <!--                        todo here -->
                    <span class="leading-none m-0 p-0 custom-button-text">next</span>
                    <img src="./src/resources/arrow.svg" alt="arrow"
                         class="w-[30px] 2xl:w-[75px] m-0 p-0"/>

                    <span class="leading-none m-0 p-0 custom-button-text">next</span>
                </button>
                <!--        {/* Prev btn */}-->
                <button class="flex flex-col justify-center items-start gap-[5px]">
<!--                        onclick="handleClickPrev()">-->
                    <!--                        todo here -->
                    <span class="leading-none m-0 p-0 custom-button-text">prev</span>
                    <img src="./src/resources/arrow-prev.svg" alt="arrow"
                         class="w-[30px] 2xl:w-[75px] m-0 p-0"/>
                    <span class="leading-none m-0 p-0 custom-button-text">prev</span>
                </button>
            </div>
            <!--    {/* main part of the art displayed  */}-->
            <div id="main" class="flex flex-col 2xl:static 2xl:absolute 2xl:top-1/2 2xl:left-[60%] z-30
            transform 2xl:-translate-y-1/2 2xl:-translate-x-1/2 transition-all duration-500">
                <div class="flex flex-col items-center justify-center px-[20%] 2xl:p-0">
                    <div class="relative border-[3px] border-[#D1AC8A] rounded-full">
                        <!--                        outline div around the image -->
                        <div class="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        outline-[10px] outline-offset-[15px] outline-double outline-[#D1AC8A] rounded-full">
                        </div>
                        <!--                        todo : catch onclick event to add in cart the correct item -> use woocommerce functionnalities maybe ? -->
                        <button id="add_to_cart" class="flex flex-col justify-center items-center absolute top-0 -right-[20%] z-50"
                                value="1">
                            <!--                        todo here -->
                            <img src="./src/resources/button-cart.svg"
                                 alt="add to cart"
                                 class="w-[125px] 2xl:w-[150px] h-[125px] 2xl:h-[150px]"/>
                        </button>
                        <!-- the circle that used around the main image -->
                        <!-- the tips for this is on the duplication of the main image, with css mask with the same tips used in photohshop -->
                        <!-- ( all the black masked is displayed and all  the white is undisplayed from the screen -->
                        <div id="skew-circle"
                             class="w-[250px] 2xl:w-[350px] h-[250px] 2xl:h-[350px] border-[3px] border-slate-300
                             rounded-full absolute bottom-0 left-1/2 z-5 skew-circle transition-all duration-500">
                        </div>
                        <!--                        image on the front -->
                        <img id="firstImage"
                             class="object-cover w-[300px] 2xl:w-[350px] h-[350px] 2xl:h-[600px] rounded-full
                        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 custom-z-index"
                             alt="{titles[0]}" src="{images[0]}"/>
                        <!--                        image on the back -->
                        <img id="firstImageCover"
                             class="object-cover w-[300px] 2xl:w-[350px] h-[350px] 2xl:h-[600px] rounded-full"
                             alt="{titles[0]}" src="{images[0]}"/>
                        <img src="/src/resources/star.svg" alt="stars"
                             class="absolute h-[70px] w-[70px] top-0 left-0 transform -translate-x-[135%]"/>
<!--                        todo here -->
                    </div>
                </div>
                <!--    {/* second part ( mobile ) */}-->
                <div class="flex flex-col -z-10 select-none pointer-events-none 2xl:hidden ">
                    <h2 class="flex items-center">
                        <!--                        the title on mobile view undisplayed on desktop view, change by javascript when the page is loaded -->
                        <span id="mobile-title"
                              class="font-square text-[50px] 2xl:text-[140px] leading-tight font-bold text-[#D1AC8A]
                              transition-all duration-300">
                            {titles[0]}
                        </span>
                    </h2>
                    <div id="mobile-authorNameContainer"
                         class="flex flex-col 2xl:flex-row 2xl:justify-around mt-[30px] 2xl:mt-[50px]
                         transition-all duration-300 ">
                        <!--                        the author Name on mobile view undisplayed on desktop view, change by javascript when the page is loaded -->
                        <span id="mobile-authorName"
                              class="font-square text-[30px] transition-all duration-300">
                            {authors[0]}
                        </span>
                        <!--                        the date on mobile view undisplayed on desktop view, change by javascript when the page is loaded -->
                        <span id="mobile-date"
                              class="font-square text-[30px] font-bold text-[#D1AC8A] transition-all duration-300">
                            {dates[0]}
                        </span>
                    </div>
                </div>
            </div>
            <!--    {/* Secondary part - next image */}-->
            <!--            the next image displayed by this section, undisplayed on mobile view -->
            <div id="secondary-container"
                 class="hidden 2xl:flex absolute top-[65%] left-[65%] 2xl:top-1/3 2xl:left-[75%] transform
                 -translate-y-1/2 -translate-x-1/2 2xl:scale-75 opacity-25 z-10 transition-all duration-300">
                <div id="secondary"
                     class="flex justify-center items-center flex-col transition-all duration-500">
                    <div class="relative">
                        <div class="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        outline-[10px] outline-offset-[15px] outline-double outline-[#D1AC8A] rounded-full">
                        </div>
                        <img id="secondaryImage"
                             class="object-cover w-[250px] 2xl:w-[350px] h-[250px] 2xl:h-[600px] rounded-full"
                             alt="{titles[1]}" src="{images[1]}"/>
                    </div>
                </div>
            </div>
        </section>
    </main>
</div>
