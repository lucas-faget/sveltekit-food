<script lang="ts">
    import { toast } from "svelte-sonner";
    import { Ellipsis } from "lucide-svelte";
    import defaultImage from "$lib/images/food.jpg";
    import type { Product } from "$lib/types";

    import * as Table from "$lib/components/ui/table";
    import { Badge } from "$lib/components/ui/badge";
    import { Button } from "$lib/components/ui/button";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    export let products: Product[];
</script>

<Table.Root>
    <Table.Header>
        <Table.Row>
            <Table.Head class="hidden w-[100px] sm:table-cell">
                <span class="sr-only">Image</span>
            </Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Brand</Table.Head>
            <Table.Head class="hidden md:table-cell">Category</Table.Head>
            <Table.Head class="hidden md:table-cell">Id</Table.Head>
            <Table.Head>
                <span class="sr-only">Actions</span>
            </Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each products as product}
            <Table.Row>
                <Table.Cell class="hidden sm:table-cell">
                    <img
                        src={product.image || defaultImage}
                        alt={product.name}
                        class="aspect-square rounded-md object-cover"
                        height="64"
                        width="64"
                    />
                </Table.Cell>
                <Table.Cell class="font-medium">{product.name}</Table.Cell>
                <Table.Cell>{product.brand}</Table.Cell>
                <Table.Cell class="hidden md:table-cell">
                    <Badge variant="outline">Product</Badge>
                </Table.Cell>
                <Table.Cell class="hidden md:table-cell">{product.api_id}</Table.Cell>
                {#if $$slots.actions}
                    <Table.Cell>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild let:builder>
                                <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    builders={[builder]}
                                >
                                    <Ellipsis class="h-4 w-4" />
                                    <span class="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content align="end">
                                <slot name="actions" {product} />
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Table.Cell>
                {/if}
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
