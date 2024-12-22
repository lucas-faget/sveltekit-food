<script lang="ts">
    import { login, register } from "$lib/api/auth";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Alert from "$lib/components/ui/alert";
    import { LoaderCircle, CircleAlert } from "lucide-svelte";

    export let registration = false;

    let name = "";
    let email = "";
    let password = "";
    let errorMessage = "";
    let isLoading = false;

    async function onSubmit() {
        isLoading = true;

        try {
            const data = registration
                ? await register(name, email, password)
                : await login(email, password);

            if (data?.message) {
                errorMessage = data?.message ?? "Authentication failed";
            }
        } catch (error) {
            console.error(error);
        } finally {
            isLoading = false;
        }
    }
</script>

<form on:submit|preventDefault={onSubmit}>
    <div class="grid gap-4">
        <div class="grid gap-4">
            {#if errorMessage}
                <Alert.Root variant="destructive">
                    <CircleAlert class="h-5 w-5" />
                    <Alert.Title>{errorMessage}</Alert.Title>
                </Alert.Root>
            {/if}
            {#if registration}
                <div class="grid gap-2">
                    <Label for="name">Name</Label>
                    <Input bind:value={name} id="name" required />
                </div>
            {/if}
            <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input
                    bind:value={email}
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    required
                    disabled={isLoading}
                />
            </div>
            <div class="grid gap-2">
                <Label for="email">Password</Label>
                <Input
                    bind:value={password}
                    id="password"
                    type="password"
                    disabled={isLoading}
                    required
                />
            </div>
        </div>
        <Button type="submit" disabled={isLoading}>
            {#if isLoading}
                <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
            {/if}
            {registration ? "Sign Up" : "Sign In"}
        </Button>
    </div>
</form>
