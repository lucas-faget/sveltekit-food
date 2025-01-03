<script lang="ts">
    import { writable } from "svelte/store";
    import type { Product } from "$lib/types";
    import { deleteProduct, searchProducts } from "$lib/api/products";
    import { LoaderCircle, Search, Trash2, UtensilsCrossed } from "lucide-svelte";

    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import * as Tabs from "$lib/components/ui/tabs";
    import * as Card from "$lib/components/ui/card";
    import * as Pagination from "$lib/components/ui/pagination";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    import ProductTable from "$lib/components/ProductTable.svelte";
    import IntakeDialog from "$lib/dialogs/IntakeDialog.svelte";
    import DeletionDialog from "$lib/dialogs/DeletionDialog.svelte";

    const products = writable<Product[]>([]);
    let productCount: number = 0;
    let perPage: number = 0;
    let pageCount: number = 0;
    let currentPage: number = 1;
    let isLoading: boolean = false;
    let searchQuery: string = "";
    let debouncedQuery: string = searchQuery;
    let debounceTimeout: any;

    let productId: number | undefined = undefined;
    let isIntakeDialogOpen: boolean = false;
    let isProductDeletionDialogOpen: boolean = false;

    const search = async (query: string = debouncedQuery, page: number = 1) => {
        clearTimeout(debounceTimeout);
        console.log("searching for products...");
        isLoading = true;
        const data = await searchProducts(query, page);
        if (data?.products) {
            products.set(data.products);
            productCount = data.productCount;
            perPage = data.perPage;
            pageCount = data.pageCount;
            isLoading = false;
        }
    };

    const handleProductDeletion = async () => {
        if (productId) {
            const deleted = await deleteProduct(productId);
            if (deleted) {
                products.update((storedProducts) =>
                    storedProducts.filter((storedProduct) => storedProduct.id !== productId)
                );
            }
        }
    };

    $: {
        debouncedQuery = debouncedQuery.trim();
    }

    $: {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            if (debouncedQuery !== searchQuery.trim()) {
                debouncedQuery = searchQuery;
                currentPage = 1;
            }
        }, 1000);
    }

    $: {
        search(debouncedQuery, currentPage);
    }
</script>

<div class="flex-1 p-4 flex flex-col gap-4">
    <form class="flex gap-2 items-center" on:submit|preventDefault={() => search()}>
        <div class="flex-1 relative flex items-center">
            <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-5 w-5" />
            <Input
                bind:value={searchQuery}
                type="search"
                placeholder="Search products..."
                class="pl-10"
            />
        </div>
        <Button type="submit">
            {#if isLoading}
                <LoaderCircle class="mr-2 h-5 w-5 animate-spin" />
            {:else}
                <Search class="mr-2 h-5 w-5" />
            {/if}
            Search
        </Button>
    </form>

    <div class="h-full flex flex-col gap-2">
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
                        {#if isLoading}
                            <div class="flex justify-center py-8">
                                <LoaderCircle class="mr-2 h-12 w-12 animate-spin" />
                            </div>
                        {:else if $products.length > 0}
                            <ProductTable products={$products}>
                                <div slot="actions" let:product>
                                    <DropdownMenu.Label>Actions</DropdownMenu.Label>
                                    <DropdownMenu.Item
                                        on:click={() => {
                                            productId = product.id;
                                            isIntakeDialogOpen = true;
                                        }}
                                    >
                                        <UtensilsCrossed class="mr-2 h-4 w-4" />
                                        <span>Add an intake</span>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item
                                        on:click={() => {
                                            productId = product.id;
                                            isProductDeletionDialogOpen = true;
                                        }}
                                    >
                                        <Trash2 class="mr-2 h-4 w-4" />
                                        <span>Delete</span>
                                    </DropdownMenu.Item>
                                </div>
                            </ProductTable>
                        {:else}
                            <div class="flex flex-col items-center gap-1 text-center py-8">
                                <h3 class="text-2xl font-bold tracking-tight">No product found</h3>
                                <p class="text-muted-foreground text-sm">
                                    Please try a new search.
                                </p>
                            </div>
                        {/if}
                    </Card.Content>
                    <Card.Footer>
                        <div class="w-full flex justify-between items-center">
                            <Pagination.Root
                                count={productCount}
                                {perPage}
                                let:pages
                                bind:page={currentPage}
                            >
                                <Pagination.Content>
                                    <Pagination.Item>
                                        <Pagination.PrevButton />
                                    </Pagination.Item>
                                    {#each pages as page (page.key)}
                                        {#if page.type === "ellipsis"}
                                            <Pagination.Item>
                                                <Pagination.Ellipsis />
                                            </Pagination.Item>
                                        {:else if page.value > 0}
                                            <Pagination.Item>
                                                <Pagination.Link
                                                    {page}
                                                    isActive={currentPage == page.value}
                                                >
                                                    {page.value}
                                                </Pagination.Link>
                                            </Pagination.Item>
                                        {/if}
                                    {/each}
                                    <Pagination.Item>
                                        <Pagination.NextButton />
                                    </Pagination.Item>
                                </Pagination.Content>
                            </Pagination.Root>
                            <div class="text-muted-foreground text-xs">
                                Showing <strong>1-{perPage}</strong> of
                                <strong>{productCount}</strong> products
                            </div>
                        </div>
                    </Card.Footer>
                </Card.Root>
            </Tabs.Content>
        </Tabs.Root>
    </div>
</div>

<IntakeDialog bind:open={isIntakeDialogOpen} bind:productId />
<DeletionDialog
    bind:open={isProductDeletionDialogOpen}
    type="intake"
    onConfirm={handleProductDeletion}
/>
