<script>
  import { goto } from '$app/navigation'
  import { close, open, menu } from '$lib/stores'
  import { APP } from '$lib/constants'
  import data from './options.json';

  const handle = (id) => {
    switch (id) {
      case APP.OPTION_RETURN:
        open(APP.POPUP_RETURN)
        break;
      case APP.OPTION_BORROW:
        open(APP.POPUP_BORROW)
        break
      case APP.OPTION_EDIT:
        goto(APP.ROUTE_EDIT.replace('[id]', $menu.id))
        break
      default:
        throw new Error('unknown option id: ', id)
    }
  }

  const cancel = () => {
    close(APP.POPUP)
  }
</script>

<ul class="grid gap-3">
  {#each data as item}
    {#if $menu.options.includes(item.id)}
      <li class="text-red-700 grid cursor-pointer" on:click={() => handle(item.id)}>
        <span class="font-semibold text-lg">{item.title}</span>
        <span class="text-xs text-gray-500">
          {item.description}
        </span>
      </li>
    {/if}
  {/each}
</ul>

<button on:click={cancel} class="text-red-500 text-xl">
  cancelar
</button>
