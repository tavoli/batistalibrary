<script>
  import Navigate from '$lib/navigate.svelte'
</script>

<main class="grid min-h-screen">
  <img class="w-full object-cover" src="/header.png" />
  <h1 class="text-red-700 text-4xl font-light self-center text-center py-16">Biblioteca</h1>
  <p class="text-center px-12">Desbrave sua biblioteca com facilidade - organize e controle empréstimos</p>

  <div class="self-end flex flex-col py-16 gap-2 mx-16">
    <Navigate to="login">ENTRAR</Navigate>
    <Navigate to="signup">CADASTRAR</Navigate>
  </div>
</main>
