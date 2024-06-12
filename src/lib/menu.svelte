<script>
  import { goto } from '$app/navigation'
  import { open } from '$lib/store'
  import { APP } from '$lib/constants'

  import menu from './menu.json'

  let active = 'LIST'

  function handleMenu(id) {
    switch (id) {
      case 'SEARCH':
        open(APP.POPUP_FILTER)
        active = 'SEARCH'
        break
      case 'UPLOAD':
        goto(APP.ROUTE_UPLOAD)
        active = 'UPLOAD'
        break
      case 'LIST':
        goto(APP.ROUTE_LIST)
        active = 'LIST'
        break
    }
  }
</script>

<div class="flex justify-around">
  {#each menu as item}
    <button class="text-brown-500 text-2xl" on:click={() => handleMenu(item.id)}>
      <svg width={item.size[0]} height={item.size[1]} viewBox={item.viewBox} xmlns="http://www.w3.org/2000/svg">
        <path fill={item.color} d={item.path} opacity={item.id === active ? 1 : 0.5} />
      </svg>
    </button>
  {/each}
</div>
