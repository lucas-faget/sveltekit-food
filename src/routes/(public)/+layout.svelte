<script>
    import Header from "$lib/components/Header.svelte";
    import "../../app.css";
</script>

<div class="flex flex-col">
    <Header />
    <div class="bg-neutral-100 min-h-screen">
        <slot />
    </div>
</div>
