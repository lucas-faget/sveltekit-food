<script lang="ts">
    import { Apple, User, Menu, Search } from "lucide-svelte";

    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";

    import { logout } from "$lib/api/auth";

    export let authenticated: boolean = false;
</script>

<header
    class="bg-background sticky top-0 h-16 flex justify-between items-center gap-4 border-b px-4 md:px-6 z-50"
>
    <nav
        class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
    >
        <a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Apple class="h-6 w-6" />
            <span class="sr-only">Food App</span>
        </a>
        {#if authenticated}
            <a href="/food" class="text-muted-foreground hover:text-foreground transition-colors">
                Food
            </a>
            <a href="/basket" class="text-muted-foreground hover:text-foreground transition-colors">
                Basket
            </a>
            <a
                href="/intakes"
                class="text-muted-foreground hover:text-foreground transition-colors"
            >
                Intakes
            </a>
        {/if}
    </nav>
    <Sheet.Root>
        <Sheet.Trigger asChild let:builder>
            <Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
                <Menu class="h-5 w-5" />
                <span class="sr-only">Toggle navigation menu</span>
            </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left">
            <nav class="grid gap-6 text-lg font-medium">
                <a href="/" class="flex items-center gap-2 text-lg font-semibold">
                    <Apple class="h-6 w-6" />
                    <span class="sr-only">Acme Inc</span>
                </a>
                {#if authenticated}
                    <a href="/food" class="text-muted-foreground hover:text-foreground"> Food </a>
                    <a href="/basket" class="text-muted-foreground hover:text-foreground">
                        Basket
                    </a>
                    <a href="/intakes" class="text-muted-foreground hover:text-foreground">
                        Intakes
                    </a>
                {/if}
            </nav>
        </Sheet.Content>
    </Sheet.Root>
    <div>
        {#if authenticated}
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild let:builder>
                    <Button
                        builders={[builder]}
                        variant="secondary"
                        size="icon"
                        class="rounded-full"
                    >
                        <User class="h-5 w-5" />
                        <span class="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                    <DropdownMenu.Label>My Account</DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>Settings</DropdownMenu.Item>
                    <DropdownMenu.Item>Support</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item on:click={logout}>Logout</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        {:else}
            <div class="ml-auto flex gap-2">
                <Button href="/login" variant="outline">Sign In</Button>
                <Button href="/register">Sign Up</Button>
            </div>
        {/if}
    </div>
</header>
