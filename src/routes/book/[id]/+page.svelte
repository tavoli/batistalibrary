<script>
  function handleBack() {
    window.history.back();
  }
</script>

<div class="p-4 flex flex-col h-screen">
  <a href="#" class="text-red-700 font-bold underline" on:click|preventDefault={handleBack}>voltar</a>

  <h1 class="text-center text-red-700 font-bold text-xl">Detalhes do livro</h1>
  
  <div class="bg-red-200 mt-24 h-96">
    <div class="flex justify-center h-52 mt-4">
      <div class="w-64 relative">
        <div class="w-full h-64 bg-gray-50 absolute -top-20 shadow-lg" />
      </div>
    </div>

    <h2 class="text-center text-red-700 font-bold text-lg">Title of the book here</h2>
    <p class="text-center text-gray-600">by Autor</p>

    <div class="flex justify-around my-8">
      <div class="text-center">
        <p class="text-gray-600">Pages</p>
        <p class="text-red-700 font-bold">XXX</p>
      </div>
      <div class="text-center">
        <p class="text-gray-600">Categoria</p>
        <p class="text-red-700 font-bold">XXX</p>
      </div>
      <div class="text-center">
        <p class="text-gray-600">Publicação</p>
        <p class="text-red-700 font-bold">XXX</p>
      </div>
    </div>
  </div>

  <div class="flex-1 mt-10">
    <h3 class="text-red-700 font-bold">Descrição</h3>
    <p class="text-gray-600 mt-2">
      In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum mh
    </p>
  </div>

  <div class="flex items-center mt-4 gap-4 bg-red-200 -m-4 p-4">
    <div class="w-4 h-4 bg-green-500 rounded-full"></div>
    <p class="text-red-700 font-semibold">Disponível na estante</p>
  </div>
</div>
