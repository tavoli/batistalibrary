  <script>
    export let title = ''

    function handleBack() {
      window.history.back();
    }
  </script>

  <div class="p-2 flex sticky top-0 bg-white shadow-sm">
    <a href="#" class="text-red-700 font-bold underline" on:click|preventDefault={handleBack}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
    <h1 class="flex-1 text-xl font-medium text-red-800 text-center">{title}</h1>
  </div>
