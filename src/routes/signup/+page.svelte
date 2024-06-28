<script>
  import { goto } from '$app/navigation'
  import { APP } from '$lib/constants'
  import Input from '$lib/input.svelte'

  export let data;

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch('/signup/?setCookie', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      goto(APP.ROUTE_LIST, {invalidateAll: true})
    }
  }
</script>

<main class="grid min-h-screen bg-gray-50">
  <img class="w-full object-cover h-60" src="/header.webp" alt="Header Image" />

  <h1 class="text-red-700 text-4xl font-bold self-center text-center">BookBack</h1>

  <div class="flex flex-col items-center gap-2">
    <img src={data.session.user.image} class="w-16 h-16 mx-auto" alt="User Avatar" />
    <span>Olá {data.session.user.name}</span>
  </div>

  <div class="self-end flex flex-col py-16 gap-4 bg-white p-8 shadow-md">
    <form on:submit={handleSubmit} method="POST" class="flex flex-col gap-1 w-full">
      <input 
        class="w-full mt-1 px-3 py-2 border border-red-700 placeholder:text-red-700 text-center mb-4" 
        placeholder="Insira o nome da biblioteca"
        name="library"
        type="text"
        value={data.library ?? ''}
        required
      />
      <button type="submit" class="mt-4 btn btn-primary flex items-center justify-center gap-2 py-2 px-4">
        <span>Acessar</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 7l5 5-5 5V7zm5 0l5 5-5 5V7z" fill="currentColor"/>
        </svg>
      </button>
    </form>
  </div>
</main>
