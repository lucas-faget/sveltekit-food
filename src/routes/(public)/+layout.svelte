<script>
    import Header from "$lib/components/Header.svelte";
    import "../../app.css";
</script>

<div class="flex flex-col min-h-screen">
    <Header />
    <slot />
</div>
