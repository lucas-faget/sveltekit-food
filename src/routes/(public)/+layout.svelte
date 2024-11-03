<script>
    import Header from "$lib/components/Header.svelte";
    import "../../app.css";
</script>

<div class="flex flex-col min-h-screen bg-neutral-100">
    <Header />
    <slot />
</div>
