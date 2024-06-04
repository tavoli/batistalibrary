<script>
  import { goto } from '$app/navigation'

  export let to = ''
</script>

<button class="btn btn-primary" on:click={() => goto(to)}>
  <slot />
</button>
