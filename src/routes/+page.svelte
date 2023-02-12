<script>
    import {oeuvres} from "../store.ts";

    let oeuvresValue;

    oeuvres.subscribe(value => {
        oeuvresValue = value;
    });

    let flag = false;
    let count = 0;
    let flagBurger = false;


</script>


<div class="relative min-h-screen w-screen App">
    <img src="./static/draw.svg" alt="draw"
         class={"max-h-screen h-full -z-10 absolute top-0 right-0 filter invert opacity-5 transform scale-[3] 2xl:scale-100 overflow-hidden"}/>
    <div class={"absolute top-0 left-0 w-full flex 2xl:hidden justify-center items-center p-[50px]"}>
        <h2 class="text-center text-5xl font-bold text-slate-50">Artriste</h2>
    </div>
    <!--{/* Hamburger btn */}-->
    <div class={"block 2xl:hidden burger absolute top-0 left-0 z-[60] transform scale-50"}>
        <div class={"burger-container " + (flagBurger ? "burger-active" : "")} on:click={() => {
          flagBurger = !flagBurger;
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 200 200">
                <g stroke-width="6.5" stroke-linecap="round">
                    <path
                            d="M72 82.286h28.75"
                            fill="#009100"
                            fill-rule="evenodd"
                            stroke="#fff"
                    />
                    <path
                            d="M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554"
                            fill="none"
                            stroke="#fff"
                    />
                    <path
                            d="M72 125.143h28.75"
                            fill="#009100"
                            fill-rule="evenodd"
                            stroke="#fff"
                    />
                    <path
                            d="M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554"
                            fill="none"
                            stroke="#fff"
                    />
                    <path
                            d="M100.75 82.286h28.75"
                            fill="#009100"
                            fill-rule="evenodd"
                            stroke="#fff"
                    />
                    <path
                            d="M100.75 125.143h28.75"
                            fill="#009100"
                            fill-rule="evenodd"
                            stroke="#fff"
                    />
                </g>
            </svg>
        </div>
    </div>
    <nav role="navigation"
         class={"w-full transform fixed 2xl:static h-screen 2xl:h-[100px] transition " +
             (flagBurger ? "opacity-100 translate-y-0 select-auto pointer-events-auto bg-custom " : "opacity-0 -translate-y-[100vh] select-none pointer-events-none ") +
             "2xl:bg-transparent 2xl:opacity-100 2xl:translate-y-0 flex flex-col 2xl:flex-row items-center 2xl:px-[250px] " +
             "gap-0 2xl:gap-[50px] py-[100px] 2xl:py-0 z-50 2xl:z-10 " +
             "2xl:select-auto 2xl:pointer-events-auto"}>
        <div
                class={"flex flex-col 2xl:flex-row items-center w-full 2xl:w-1/3 justify-evenly 2xl:justify-between h-full"}>
            <a class="text-3xl" href="">Accueil</a>
            <a class="text-3xl" href="">Qui sommes-nous ?</a>
        </div>
        <div class={"flex items-center 2xl:gap-5 w-full 2xl:w-1/3 justify-center h-full"}>
            <h1 class="text-center text-5xl font-bold text-slate-50">Artriste</h1>
        </div>
        <div
                class={"flex flex-col 2xl:flex-row items-center 2xl:gap-[100px] w-full 2xl:w-1/3 justify-evenly 2xl:justify-end h-full "}>
            <a class="text-3xl" href="">Contactez nous</a>
            <a class="relative" href="">
            <span class={"text-xl absolute -top-[5px] left-[calc(50%+2px)] transform -translate-x-1/2 font-bitter"}>
              {count + 1}
            </span>
                <img src="./static/add-cart.svg" alt="add cart" class={"w-[35px] h-[35px]"}/>
            </a>
        </div>
    </nav>
    <main
            class={"w-full h-full flex flex-col justify-center min-h-screen 2xl:min-h-[calc(100vh-100px)] px-[20px] py-[40px] 2xl:p-0 z-10"}>
        <section class="w-full h-full flex flex-col 2xl:flex-row relative 2xl:px-[250px] gap-[50px]">
            <div
                    class="w-full h-full 2xl:w-[40%] 2xl:min-h-[70vh] flex flex-col gap-[50px] justify-between pt-[100px] 2xl:justify-center">
                <div class={"flex flex-col h-full justify-center"}>
                    <h1 class={"text-[36px] 2xl:text-[40px] text-[#D1AC8A]"}>
                        Une collection d'art unique !
                    </h1>
                    <p class={"text-[16px] 2xl:text-[20px] text-slate-300"}>
                        Des oeuvres d'art uniques et originales, vente à l'unité, ultra limité. Vous serez le seul et unique
                        propriétaire de votre oeuvre !
                    </p>
                </div>
                <h2 class={"hidden 2xl:flex flex-col"}>
                    <div class={"flex items-center"}>
                <span
                        class={"font-square text-[50px] 2xl:text-[140px] leading-tight font-bold text-[#D1AC8A] " +
                    "transition-all duration-300 " + (flag ? 'scale-0 -z-10' : '')}>
                  {title}
                </span>
                    </div>
                    <div
                            class={"flex flex-col 2xl:flex-row 2xl:justify-around mt-[30px] 2xl:mt-[50px] transition-all duration-300 " + (flag ? 'scale-0 -z-10' : '')}>
                <span
                        class={"font-square text-[30px] transition-all duration-300 " + (flag ? 'scale-0 -z-10' : '')}>
                  {authorName}
                </span>
                        <span
                                class={"font-square text-[30px] font-bold text-[#D1AC8A] transition-all duration-300 " + (flag ? 'scale-0 -z-10' : '')}>
                  {date}
                </span>
                    </div>
                </h2>
            </div>
            <div class="absolute bottom-0 left-0 w-full 2xl:w-[60%] flex flex-col-reverse 2xl:static 2xl:bottom-auto 2xl:left-auto
          2xl:flex-row-reverse items-end justify-start gap-[30px] z-30">
                <!--{/*  button to go to the next image ( arrow ) */}-->
                <button class={"flex flex-col justify-center items-start gap-[5px]"}
                        on:click={handleClick}>
                    <span class={"leading-none m-0 p-0 custom-button-text"}>next</span>
                    <img src="./static/arrow.svg" alt="arrow" class={"w-[30px] 2xl:w-[75px] m-0 p-0"}/>
                    <span class={"leading-none m-0 p-0 custom-button-text"}>next</span>
                </button>
                <!--{/* Prev btn */}-->
                <button class={"flex flex-col justify-center items-start gap-[5px]"}
                        on:click={handleClickPrev}>
                    <span class={"leading-none m-0 p-0 custom-button-text"}>prev</span>
                    <img src="./static/arrow-prev.svg" alt="arrow" class={"w-[30px] 2xl:w-[75px] m-0 p-0 "}/>
                    <span class={"leading-none m-0 p-0 custom-button-text"}>prev</span>
                </button>
            </div>
            <!--{/* main part */}-->
            <div
                    class={"flex flex-col 2xl:static 2xl:absolute 2xl:top-1/2 2xl:left-[60%] transform 2xl:-translate-y-1/2 2xl:-translate-x-1/2 z-20 " +
              "transition-all duration-500 " + (flag ? 'opacity-0 -z-10 -scale-x-100' : '')}>
                <div class="flex flex-col items-center justify-center px-[20%] 2xl:p-0">
                    <div class={"relative border-[3px] border-[#D1AC8A] rounded-full"}>
                        <div
                                class={"w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 " +
                    "-translate-y-1/2 " + "outline-[10px] outline-offset-[15px] outline-double  " + "outline-[#D1AC8A] rounded-full"}>
                        </div>
                        <button class={"flex flex-col justify-center items-center absolute top-0 -right-[20%] z-50"}>
                            <img src="./static/button-cart.svg" alt="add to cart"
                                 class={"w-[125px] 2xl:w-[150px] h-[125px] 2xl:h-[150px]"}/>
                        </button>
                        <div
                                class={"w-[250px] 2xl:w-[350px] h-[250px] 2xl:h-[350px] border-[3px] border-slate-300 rounded-full absolute " +
                    "bottom-0 left-1/2 z-5 " + "skew-circle transition-all duration-500 " + (flag ? 'opacity-0' : '')}>
                        </div>
                        <img
                                class={"object-cover w-[300px] 2xl:w-[350px] h-[350px] 2xl:h-[600px] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 custom-z-index "}
                                src=""
                                alt="img"/>
                        <img
                                class={"object-cover w-[300px] 2xl:w-[350px] h-[350px] 2xl:h-[600px] rounded-full"}
                                src=""
                                alt="img"/>
                        {/*<img src="./static/star.svg" alt="stars" class={"absolute h-[60px] w-[60px] right-[5%] filter invert star-on-ring"}/> * /}
                        <img src="./static/star.svg" alt="stars"
                             class={"absolute h-[70px] w-[70px] top-0 left-0 transform -translate-x-[135%]"}/>
                        {/*<div class={"w-[350px] h-[600px] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 custom-z-index"}>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <!--{/* second part ( mobile ) */}-->
                <div class={"flex flex-col -z-10 select-none pointer-events-none 2xl:hidden "}>
                    <h2 class={"flex items-center"}>
                <span
                        class={"font-square text-[50px] 2xl:text-[140px] leading-tight font-bold text-[#D1AC8A] " +
                    "transition-all duration-300 " + (flag ? 'scale-0 -z-10' : '')}>
                  title
                </span>
                    </h2>
                    <div
                            class={"flex flex-col 2xl:flex-row 2xl:justify-around mt-[30px] 2xl:mt-[50px] transition-all duration-300 " + (flag ? 'scale-0 -z-10' : '')}>
                <span
                        class={"font-square text-[30px] transition-all duration-300 " + (flag ? 'scale-0 -z-10' : '')}>
                  author
                </span>
                        <span
                                class={"font-square text-[30px] font-bold text-[#D1AC8A] transition-all duration-300 " + (flag ? 'scale-0 -z-10' : '')}>
                  date
                </span>
                    </div>
                </div>

            </div>
            <!--{/* Secondary part - next image */}-->
            <div
                    class={"hidden 2xl:flex absolute top-[65%] left-[65%] 2xl:top-1/3 2xl:left-[75%] transform -translate-y-1/2 -translate-x-1/2 2xl:scale-75 opacity-25 z-10 " +
              "transition-all duration-300 " + (flag ? 'opacity-0 -z-10' : '')}>
                <div
                        class={"flex justify-center items-center flex-col transition-all duration-500 " + (flag ? 'opacity-0 -z-10' : '')}>
                    <div class={"relative"}>
                        <div
                                class={"w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " + "outline-[10px] outline-offset-[15px] outline-double  " + "outline-[#D1AC8A] rounded-full"}>
                        </div>
                        <img
                                class={"object-cover w-[250px] 2xl:w-[350px] h-[250px] 2xl:h-[600px] rounded-full"}
                                src=""
                                alt="img"/>
                    </div>
                </div>
            </div>
        </section>
    </main>
</div>


<h1>Welcome to SvelteKit</h1>
test
<div>
    {#each oeuvresValue as oeuvre}
        <p>{oeuvre.name}</p>
    {/each}
</div>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


