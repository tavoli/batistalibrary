<script>
  export let placeholder = '';
  export let value = '';
  export let className = '';
  export let type = 'text';
  export let label = '';
  export let handleInput = () => {};
</script>

{#if type === 'checkbox'}
  <div class="flex items-center">
     <input 
        id="remember_me" 
        class="w-4 h-4 text-red-700 border-red-700 focus:ring-red-700" 
        type="checkbox" 
        placeholder={placeholder}
        value={value}
        on:input={handleInput}
      />
     <label for="remember_me" class="block ml-2 text-sm text-red-700 {className}">{label}</label>
  </div>
{:else}
  <div>
    <input 
      class="w-full mt-1 px-3 py-2 border border-red-700 placeholder:text-red-700 {className}" 
      placeholder={placeholder}
      value={value}
      type={type}
      on:input={handleInput}
    />
  </div>
{/if}
