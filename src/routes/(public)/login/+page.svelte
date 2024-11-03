<script lang="ts">
    import { goto } from "$app/navigation";
    import { getCsrfToken, login } from "$lib/api/auth";
    import placeholder from "$lib/images/placeholder.svg";

    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    let email = "";
    let password = "";
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

<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div class="flex items-center justify-center py-12">
        <div class="mx-auto grid w-[350px] gap-6">
            <div class="grid gap-2 text-center">
                <h1 class="text-3xl font-bold">Login</h1>
            </div>
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input
                        bind:value={email}
                        id="email"
                        type="email"
                        placeholder="example@mail.com"
                        required
                    />
                </div>
                <div class="grid gap-2">
                    <div class="flex items-center">
                        <Label for="password">Password</Label>
                        <a href="/" class="ml-auto inline-block text-sm underline">
                            Forgot your password?
                        </a>
                    </div>
                    <Input bind:value={password} id="password" type="password" required />
                </div>
                <Button on:click={() => handleLogin()} type="submit" class="w-full">Login</Button>
            </div>
            <div class="mt-4 text-center text-sm">
                <span>Don't have an account?</span>
                <a href="/register" class="underline"> Sign up </a>
            </div>
        </div>
    </div>
    <div class="bg-muted hidden lg:block">
        <img
            src={placeholder}
            alt="placeholder"
            width="1920"
            height="1080"
            class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
    </div>
</div>
