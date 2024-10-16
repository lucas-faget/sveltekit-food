<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import type { Product } from "../../types";
    import { searchFood } from "../../api/foodApi";

    const products = writable<Product[]>([]);

    onMount(async () => {
        const data = await searchFood("apple");
        products.set(data.products);
    });
</script>

<h1>Products</h1>

<div class="flex flex-col gap-2">
    {#each $products as product}
        <div>
            <span>{product.api_id} |</span>
            <span>{product.name} |</span>
            <span>{product.brand} |</span>
            <a href={`/food/${product.api_id}`}>Show</a>
        </div>
    {/each}
</div>
