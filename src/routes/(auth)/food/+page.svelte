<script lang="ts">
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import type { Product } from "$lib/types";
    import { searchFood } from "$lib/api/food";
    import { LoaderCircle, Search } from "lucide-svelte";

    import { Input } from "$lib/components/ui/input/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import ProductTable from "$lib/components/ProductTable.svelte";

    const products = writable<Product[]>([]);
    let isLoading: boolean = false;
    let searchQuery: string = "apple";

    const search = async () => {
        isLoading = true;
        const data = await searchFood(searchQuery);
        products.set(data.products);
        isLoading = false;
    };

    onMount(async () => {
        const data = await searchFood(searchQuery);
        products.set(data.products);
    });
</script>

<div class="flex-1 p-4 flex flex-col gap-4">
    <form class="flex gap-2 items-center">
        <div class="flex-1 relative flex items-center">
            <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-5 w-5" />
            <Input
                bind:value={searchQuery}
                type="search"
                placeholder="Search products..."
                class="pl-10"
            />
        </div>
        <Button type="submit" on:click={search}>
            {#if isLoading}
                <LoaderCircle class="mr-2 h-5 w-5 animate-spin" />
            {:else}
                <Search class="mr-2 h-5 w-5" />
            {/if}
            Search
        </Button>
    </form>

    <div class="h-full flex flex-col gap-2">
        {#if isLoading}
            <LoaderCircle class="mr-2 h-12 w-12 animate-spin" />
        {:else if $products.length > 0}
            <Tabs.Root value="all">
                <Tabs.List>
                    <Tabs.Trigger value="all">All</Tabs.Trigger>
                    <Tabs.Trigger value="active">Active</Tabs.Trigger>
                    <Tabs.Trigger value="draft">Draft</Tabs.Trigger>
                    <Tabs.Trigger value="archived" class="hidden sm:flex">Archived</Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="all">
                    <Card.Root>
                        <Card.Header>
                            <Card.Title>Products</Card.Title>
                            <Card.Description>
                                Here you will find the result of your food product search.
                            </Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <ProductTable products={$products} />
                        </Card.Content>
                        <Card.Footer>
                            <div class="text-muted-foreground text-xs">
                                Showing <strong>1-10</strong> of <strong>32</strong> products
                            </div>
                        </Card.Footer>
                    </Card.Root>
                </Tabs.Content>
            </Tabs.Root>
        {:else}
            No product
        {/if}
    </div>
</div>
