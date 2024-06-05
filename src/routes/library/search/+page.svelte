<script>
  import Tabs from '$lib/tabs.svelte'

  const [t1, t2] = ['Todos', 'Livros emprestados'];

  let active = t1;

  const handleSelect = (id) => {
    active = id;
  };
</script>

<main class="p-4">
  <Tabs tabs={[t1, t2]} {active} on:select={e => handleSelect(e.detail)}>
    {#if active === t1}
      <div>
        <h2>Todos</h2>
        <p>This is the content for Todos.</p>
      </div>
    {/if}

    {#if active === t2}
      <div>
        <h2>Livros emprestados</h2>
        <p>This is the content for Livros emprestados.</p>
      </div>
    {/if}
  </Tabs>
</main>
