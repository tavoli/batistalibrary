<script>
  import { SignIn, SignOut } from "@auth/sveltekit/components"

  import { goto } from '$app/navigation'
  import Input from '$lib/input.svelte'
  import { APP } from '$lib/constants'

  export let data;

  async function handleDeleteCookie() {
    fetch('/api/delete-library-cookie');
    window.location.reload();
  }

</script>

<main class="grid min-h-screen bg-gray-50">
  <img class="w-full object-cover h-64" src="/header.png" alt="Header Image" />

  <h1 class="text-red-700 text-4xl font-bold self-center text-center py-16">BookBack</h1>

  <p class="text-center px-12 mb-8 text-gray-700">
    Desbrave sua biblioteca com facilidade - organize e controle empréstimos
  </p>

  <div class="flex flex-col w-48 mx-auto text-center">
    {#if data.session}
      {#if data.session.user?.image}
        <img
          src={data.session.user.image}
          class="avatar w-10 mx-auto"
          alt="User Avatar"
        />
      {/if}
      <span class="signedInText">
        <small>Logado como</small><br />
        <strong>{data.session.user?.name ?? "User"}</strong>
      </span>
      <div class="mt-10 flex flex-col gap-2">
        {#if data.cookies.library}
          <a href="{APP.ROUTE_LIST}" class="btn btn-primary text-sm flex items-center">
            Ir para biblioteca {data.cookies.library}
          </a>
          <button type="submit" class="btn btn-secondary text-sm flex items-center mt-5" on:click={handleDeleteCookie}>
            <span>Sair da biblioteca {data.cookies.library}</span>
          </button>
        {:else}
          <a href="{APP.ROUTE_SIGNUP}" class="btn btn-primary text-sm">Cadastrar biblioteca</a>
        {/if}
        <SignOut>
          <div slot="submitButton" class="btn btn-secondary text-sm">Entrar com outro usuário</div>
        </SignOut>
      </div>
    {:else}
      <SignIn class="w-full grid shadow-md p-2 bg-red-700" provider="google" signInPage="signin">
        <div slot="submitButton" class="flex items-center gap-4">
          <svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
          <span class="text-white">Entrar com o Google</span>
        </div>
      </SignIn>
    {/if}
  </div>
</main>
