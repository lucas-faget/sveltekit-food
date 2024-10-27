<script lang="ts">
    import { goto } from "$app/navigation";
    import { Section, Register } from "flowbite-svelte-blocks";
    import { Button, Checkbox, Label, Input, Alert } from "flowbite-svelte";
    import { InfoCircleSolid } from "flowbite-svelte-icons";
    import { getCsrfToken, login } from "$lib/api/auth";

    let email = "";
    let password = "";
    let rememberMe = false;
    let errorMessage = "";

    const handleLogin = async () => {
        try {
            await getCsrfToken();

            const data = await login(email, password);
            console.log(data);

            if (data?.success) {
                goto("/");
            } else {
                errorMessage = data?.message ?? "Authentication failed";
            }
        } catch (error) {
            console.error(error);
        }
    };
</script>

<div class="flex justify-center items-center mt-16">
    <Section name="login">
        <Register href="/">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8 min-w-96">
                <div class="flex flex-col space-y-6">
                    <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
                        Se connecter
                    </h3>
                    {#if errorMessage}
                        <Alert border color="red">
                            <InfoCircleSolid slot="icon" class="w-5 h-5" />
                            {errorMessage}
                        </Alert>
                    {/if}
                    <Label class="space-y-2">
                        <span>Your email</span>
                        <Input
                            type="email"
                            name="email"
                            bind:value={email}
                            placeholder="name@example.com"
                            required
                        />
                    </Label>
                    <Label class="space-y-2">
                        <span>Your password</span>
                        <Input type="password" name="password" bind:value={password} required />
                    </Label>
                    <div class="flex items-start">
                        <Checkbox bind:checked={rememberMe}>Remember me</Checkbox>
                        <a
                            href="/"
                            class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <Button class="w-full bg-orange-500" on:click={handleLogin}>Sign in</Button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don't have an account yet?
                        <a
                            href="/register"
                            class="font-medium text-orange-600 hover:underline dark:text-primary-500"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </Register>
    </Section>
</div>
