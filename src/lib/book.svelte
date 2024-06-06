<script>
  import { open } from '$lib/store'

  export let id = ''
  export let author = ''
  export let thumb = ''
  export let title = ''

  const handle = () => {
    open('popup', id)
  }
</script>

<li class="flex gap-2" on:click={handle}>
  <img class="w-4/12" src={thumb} alt={title} />
  <div class="flex flex-col gap-1">
    <h3 class="text-lg">{title}</h3>
    <p class="text-lg">{author}</p>
  </div>
</li>
