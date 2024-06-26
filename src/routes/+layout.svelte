<script>
  import { fade, fly } from "svelte/transition";
  import { notification } from "$lib/stores";

  import "../app.css";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<slot />

{#if $notification}
  <div 
    id="toast" 
    class="w-max fixed z-20 bottom-20 left-1/2 transform -translate-x-1/2 mb-4 px-4 py-2 bg-red-800 text-white rounded-md shadow-lg"
    in:fly={{ y: 50, duration: 300 }}
    out:fade={{ duration: 300 }}>
    <div id="toast-content" class="flex items-center">
      <!-- Add any icon or content here -->
      <span class="text-sm">{$notification}</span>
    </div>
  </div>
{/if}
