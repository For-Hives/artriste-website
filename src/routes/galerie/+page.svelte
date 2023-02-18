<script>
    import Header from "../Components/Header.svelte";
    import {oeuvres} from "/src/utils/store.ts";
    import {api_origin} from "/src/utils/const.ts";
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
        prices = oeuvresValue.map(record => record.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €");
        descriptions = oeuvresValue.map(record => record.description);
        authors = oeuvresValue.map(record => record.author);
    });
</script>

<Header/>
<div class="relative min-h-screen w-screen App">
    <main class="w-full 2xl:static
     2xl:bg-transparent 2xl:opacity-100 2xl:translate-y-0 flex flex-col 2xl:flex-row items-center 2xl:px-[250px]
     gap-0 2xl:gap-[50px] 2xl:py-0 z-50 2xl:z-10 2xl:select-auto 2xl:pointer-events-auto">
        <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-16 py-[100px]">
            {#each oeuvresValue as item, index}
                <!-- mailto:contact@artriste.cc , precomplete with title of the article -->
                <a href="mailto:contact@artriste.cc?subject=J'aimerais acheter l'oeuvre {titles[index]}&body=Bonjour, je suis intéressé par l'oeuvre {titles[index]} de {authors[index]} datant de {dates[index]} et vendue {prices[index]}. Je vous remercie de me re-contacter pour plus d'informations."
                   class="group text-sm">
                    <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden transition transition-all duration-300 group-hover:opacity-75 relative">
                        <img src={images[index]}
                             alt="{titles[index]}"
                             class="h-full w-full object-cover object-center group">
                        <div class="overflow-hidden">
<!--                            date on right corner -->
                            <p class="absolute top-0 right-0 bg-gray-900 text-white px-2 py-1 text-xs font-medium rounded-bl-lg">{dates[index]}</p>
<!--                            CTA on hover the image, on bottom middle of the image -->
                            <p class="absolute bottom-0 left-0 right-0 bg-gray-900 text-white px-2 py-1 text-xs font-medium text-center mx-[30px]
                            transition transition-all duration-300 transform translate-y-[30px] opacity-0 group-hover:translate-y-[-10px] group-hover:opacity-100">
                                Je suis intéressé !
                            </p>
                        </div>
                    </div>
                    <h3 class="mt-4 font-bold text-5xl text-gray-100">{titles[index]}</h3>
                    <p class="italic text-gray-400 my-4">{prices[index]}</p>
                    <p class="my-1 italic text-gray-200">{@html descriptions[index]}</p>
                    <p class="mt-2 font-medium text-gray-100">
                        {authors[index]}
                    </p>
                </a>
            {/each}
        </div>
    </main>
</div>
