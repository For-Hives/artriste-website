<script>
	import Header from '../../Components/Header.svelte'

	const title = 'MERCI DE VOTRE COMMANDE !'
	// 	title to array of letters
	const letters = title.split('')
	// if letter is a space, replace with a non-breaking space
	letters.forEach((letter, index) => {
		if (letter === ' ') {
			letters[index] = '&nbsp;'
		}
	})
</script>

<Header />

<div class='relative flex min-h-[calc(100vh-100px)] w-screen items-center justify-center'>
	<div
		class='rotate-30 absolute left-0 top-0 -z-10 h-screen w-screen -translate-x-1/2 -translate-y-1/3 select-none opacity-5'
	>
		<svg
			height='512'
			viewBox='0 0 24 24'
			width='512'
			xmlns='http://www.w3.org/2000/svg'
			class='h-full w-full fill-current'
		>
			<path
				d='m5 3a2 2 0 1 1 -2-2 2 2 0 0 1 2 2zm-2 7a1 1 0 1 0 -1-1 1 1 0 0 0 1 1zm0 6a1 1 0 1 0 -1-1 1 1 0 0 0 1 1zm0 3a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm6-18a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm1 8a1 1 0 1 0 -1 1 1 1 0 0 0 1-1zm-1 4a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm0 7a1 1 0 1 0 1 1 1 1 0 0 0 -1-1zm6-16a1 1 0 1 0 -1-1 1 1 0 0 0 1 1zm0 3a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm1 8a1 1 0 1 0 -1 1 1 1 0 0 0 1-1zm-1 4a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm6-14a2 2 0 1 0 -2-2 2 2 0 0 0 2 2zm-1 4a1 1 0 1 0 1-1 1 1 0 0 0 -1 1zm1 4a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm0 7a1 1 0 1 0 1 1 1 1 0 0 0 -1-1z'
			/>
		</svg>
	</div>
	<div class='col-span-12 mx-5 flex items-center justify-center sm:mx-0'>
		<h1 class='[&>*]:text-7xl tracking-widest special-animation flex gap-3'>
			{#each letters as letter, i}
				<div class='letter-{i} flex justify-center items-center w-[35px] relative'>
					<div class='letter'>
						{@html letter}
					</div>
					<div class='bubble-container absolute top-0 left-0 w-full h-full flex justify-center items-center'>
						<div class='bubble w-full h-full relative'></div>
					</div>
				</div>
			{/each}
		</h1>
	</div>
</div>
