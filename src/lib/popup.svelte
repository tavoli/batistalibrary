<script>
  import { open } from '$lib/store'

  const handle = () => {
    open('menu')
  }
</script>

<div class="flex justify-around">
  <ul>
    <li class="text-red-700 text-2xl" on:click={() => goto(item.page)}>
      Devolver <br />
      <span class="text-xs text-gray-500">
        devolva o livro emprestado
      </span>
    </li>
    <li class="text-red-700 text-2xl" on:click={() => goto(item.page)}>
      Emprestar <br />
      <span class="text-xs text-gray-500">
        empreste um livro
      </span>
    </li>
    <li class="text-red-700 text-2xl" on:click={() => goto(item.page)}>
      Editar <br/>
      <span class="text-xs text-gray-500">
        edite o livro
      </span>
    </li>
  </ul>

  <button on:click={handle} class="text-red-700 text-xl">
    cancelar
  </button>
</div>
