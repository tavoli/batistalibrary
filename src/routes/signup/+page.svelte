<script>
  import { goto } from '$app/navigation'
  import { APP } from '$lib/constants'
  import Input from '$lib/input.svelte'
</script>

<main class="grid grid-rows-[0.5fr_1fr] min-h-screen">
   <div class="self-end grid gap-4">
     <h1 class="text-center text-2xl text-gray-600">Cadastrar</h1>
     <p class="text-center text-2xl text-gray-600">Crie sua conta</p>
   </div>
   
   <form class="grid p-16">
     <div class="grid gap-6 self-start">
       <Input placeholder="Usuário" type="text" />
       <Input placeholder="Organização" type="text" />
       <Input placeholder="E-mail" type="text" />
       <Input placeholder="Senha" type="password" />
       <Input placeholder="Confirme a senha" type="password" />
     </div>

      <div class="self-end">
       <div>
          <button 
            type="button" 
            class="w-full px-4 py-2 text-white bg-red-600 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            on:click={() => goto(APP.ROUTE_SIGNUP)}>
            CADASTRAR
          </button>
       </div>
       <p class="mt-2 text-center text-sm text-gray-600">
         Já possui uma conta? &nbsp <a href={APP.ROUTE_SIGNIN} class="font-medium underline text-red-700 hover:text-red-500">Entrar</a>
       </p>
     </div>
   </form>
 </main>
