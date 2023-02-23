<script>
    let flagBurger = false;
</script>

<!-- little line drawing on the background -->
<img src="/resources/draw.svg" alt="draw in the background"
     class="max-h-screen h-full -z-10 absolute top-0 right-0 filter invert opacity-5 transform 2xl:scale-100 overflow-hidden"/>
<!--    Artriste title absolute & hidden on desktop view ( centered on top of the page ) -->
<a href="/" class="absolute top-0 left-0 w-full flex 2xl:hidden justify-center items-center p-[50px] z-10">
    <h2 class="text-center text-5xl font-bold text-slate-50">Artriste</h2>
</a>
<!--{/* Hamburger btn */}-->
<div class="block 2xl:hidden burger absolute top-0 left-0 z-[70] transform scale-50">
    <button id="burger-container" class="burger-container {flagBurger ? 'burger-active' : ''}" on:click={()=>{flagBurger=!flagBurger}}>
        <!--             Svg burger menu icon -->
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
    </button>
</div>
<!--    the navigation part - nav bar & desktop and mobile view -> animation on that -->
<nav id="navigation" class="w-full transform fixed 2xl:static h-screen 2xl:h-[100px] transition
     2xl:bg-transparent 2xl:opacity-100 2xl:translate-y-0 flex flex-col 2xl:flex-row items-center 2xl:px-[250px]
     gap-0 2xl:gap-[50px] py-[100px] 2xl:py-0 z-50 2xl:z-10 2xl:select-auto 2xl:pointer-events-auto
     {flagBurger ? ' opacity-100 pointer-events-auto bg-custom select-auto translate-y-0' : ' opacity-0 -translate-y-[100vh] select-none pointer-events-none'}">
  <div
    class="flex flex-col 2xl:flex-row items-center w-full 2xl:w-1/3 justify-evenly 2xl:justify-between h-full">
    <a href="/" class="flex items-center justify-start h-full">
      <h2 class="text-center text-5xl font-bold text-slate-50">Artriste</h2>
    </a>
  </div>
  <div
    class="flex flex-col 2xl:flex-row items-center w-full 2xl:w-2/3 justify-evenly 2xl:justify-between 2xl:pl-[10%] h-full">
    <a class="text-3xl" href="/galerie">Galerie</a>
    <a class="text-3xl" href="/qui-sommes-nous">Qui sommes-nous ?</a>
    <a class="text-3xl" href="mailto:contact@artriste.cc">Contactez-nous</a>
  </div>
</nav>
