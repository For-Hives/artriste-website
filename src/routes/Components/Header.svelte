<script>
	let flagBurger = false
</script>

<!-- little line drawing on the background -->
<img
	src="/resources/draw.svg"
	alt="draw in the background"
	class="absolute right-0 top-0 -z-10 h-full max-h-screen transform overflow-hidden opacity-5 invert filter 2xl:scale-100"
/>
<!--    Artriste title absolute & hidden on desktop view ( centered on top of the page ) -->
<a
	href="/"
	class="absolute left-0 top-0 z-10 flex w-full items-center justify-center p-[50px] 2xl:hidden"
>
	<h2 class="text-center text-5xl font-bold text-slate-50">Artriste</h2>
</a>
<!--{/* Hamburger btn */}-->
<div
	class="burger absolute left-0 top-0 z-[70] block scale-50 transform 2xl:hidden"
>
	<button
		id="burger-container"
		class="burger-container {flagBurger ? 'burger-active' : ''}"
		on:click={() => {
			flagBurger = !flagBurger
		}}
	>
		<!--             Svg burger menu icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="150"
			height="150"
			viewBox="0 0 200 200"
		>
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
<nav
	id="navigation"
	class="fixed z-50 flex h-screen w-full transform flex-col
     items-center gap-0 py-[100px] transition 2xl:pointer-events-auto 2xl:static 2xl:z-10 2xl:h-[100px] 2xl:translate-y-0
     2xl:select-auto 2xl:flex-row 2xl:gap-[50px] 2xl:bg-transparent 2xl:px-[250px] 2xl:py-0 2xl:opacity-100
     {flagBurger
		? ' bg-custom pointer-events-auto translate-y-0 select-auto opacity-100'
		: ' pointer-events-none -translate-y-[100vh] select-none opacity-0'}"
>
	<div
		class="flex h-full w-full flex-col items-center justify-evenly 2xl:w-1/3 2xl:flex-row 2xl:justify-between"
	>
		<a href="/" class="flex h-full items-center justify-start">
			<h2 class="text-center text-5xl font-bold text-slate-50">Artriste</h2>
		</a>
	</div>
	<div
		class="flex h-full w-full flex-col items-center justify-evenly 2xl:w-2/3 2xl:flex-row 2xl:justify-between 2xl:pl-[10%]"
	>
		<a class="text-3xl" href="/galerie">Galerie</a>
		<a class="text-3xl" href="/qui-sommes-nous">Qui sommes-nous ?</a>
		<a class="text-3xl" href="mailto:contact@artriste.cc">Contactez-nous</a>
	</div>
</nav>
