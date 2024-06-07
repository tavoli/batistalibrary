<script>
  import { goto } from '$app/navigation'
  import { close, open, menu } from '$lib/store'
  import { APP } from '$lib/constants'

  const cancel = () => {
    close(APP.POPUP)
  }
</script>

<ul class="grid gap-3">
  <li class="text-red-700 grid" on:click={() => open(APP.POPUP_RETURN)}>
    <span class="font-semibold text-lg">DEVOLVER</span>
    <span class="text-xs text-gray-500">
      devolva o livro emprestado
    </span>
  </li>
  <li class="text-red-700 grid" on:click={() => open(APP.POPUP_BORROW)}>
    <span class="font-semibold text-lg">EMPRESTAR</span>
    <span class="text-xs text-gray-500">
      empreste um livros disponíveis
    </span>
  </li>
  <li class="text-red-700 grid" on:click={() => goto(APP.ROUTE_EDIT, $menu.args)}>
    <span class="font-semibold text-lg">EDITAR</span>
    <span class="text-xs text-gray-500">
      faça alterações no livro
    </span>
  </li>
</ul>

<button on:click={cancel} class="text-red-500 text-xl">
  cancelar
</button>
