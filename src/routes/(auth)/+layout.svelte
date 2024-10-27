<script>
    import "../../app.css";
    import Header from "$lib/components/Header.svelte";

    export let data;
    const { user } = data;
    console.log(user);
</script>

<div class="flex flex-col">
    <Header />
    <div class="bg-neutral-100 min-h-screen">
        <slot />
    </div>
</div>
