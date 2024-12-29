<script>
    import "../../app.css";
    import Header from "$lib/components/Header.svelte";
    import { Toaster } from "$lib/components/ui/sonner";

    // export let data;
    // const { user } = data;
    // console.log(user);
</script>

<div class="flex flex-col min-h-screen">
    <Toaster position="top-center" richColors />
    <Header authenticated />
    <slot />
</div>
