<script>
  import { goto } from '$app/navigation'
  import { APP } from '$lib/constants'
  import { open } from '$lib/store'

  export let _id
  export let title
  export let author
  export let imageUrl = 'https://placehold.co/150?text=sem foto'

  const handleGoto = () => {
    goto(APP.ROUTE_BOOK.replace('[id]', _id))
  }

  const handlePopup = () => {
    open(APP.POPUP, _id)
  }
</script>

<li class="flex gap-2 cursor-pointer">
  <img class="w-4/12" src={imageUrl} alt={title} on:click={handleGoto} />
  <div class="flex flex-1 flex-col gap-1" on:click={handleGoto}>
    <h3 class="text-lg">{title}</h3>
    <p class="text-lg">{author.name}</p>
  </div>
  <div class="w-8 h-8" on:click={handlePopup}>
    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" class="fill-red-500" />
      <circle cx="12" cy="7" r="0.5" transform="rotate(90 12 7)" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="0.5" transform="rotate(90 12 12)" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="17" r="0.5" transform="rotate(90 12 17)" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</li>
