<script>
  import { goto } from '$app/navigation'
  import { close, open, menu } from '$lib/store'
  import { APP } from '$lib/constants'
  import data from './options.json';

  const handle = (id) => {
    switch (id) {
      case 'RETURN':
        open(APP.POPUP_RETURN)
        break;
      case 'BORROW':
        open(APP.POPUP_BORROW)
        break
      case 'EDIT':
        goto(APP.ROUTE_EDIT)
        break
      default:
        throw new Error('unknown popop')
    }
  }

  const cancel = () => {
    close(APP.POPUP)
  }
</script>

<ul class="grid gap-3">
  {#each data as item}
  <li class="text-red-700 grid cursor-pointer" on:click={() => handle(item.id)}>
    <span class="font-semibold text-lg">{item.title}</span>
    <span class="text-xs text-gray-500">
      {item.description}
    </span>
  </li>
  {/each}
</ul>

<button on:click={cancel} class="text-red-500 text-xl">
  cancelar
</button>
