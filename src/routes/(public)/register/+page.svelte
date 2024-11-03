<script lang="ts">
    import { goto } from "$app/navigation";
    import { getCsrfToken, register } from "$lib/api/auth";

    import * as Card from "$lib/components/ui/card/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Button } from "$lib/components/ui/button/index.js";

    let firstName = "";
    let lastName = "";
    let email = "";
    let password = "";
    let errorMessage = "";

    $: name = firstName + " " + lastName;

    const createAccount = async () => {
        try {
            await getCsrfToken();

            const data = await register(name, email, password);

            if (data?.success) {
                goto("/login");
            } else {
                errorMessage = data?.message ?? "Registration failed";
            }
        } catch (error) {
            console.error(error);
        }
    };
</script>

<div class="flex-1 flex justify-center items-center">
    <Card.Root class="w-[450px]">
        <Card.Header>
            <Card.Title class="text-3xl font-bold">Sign Up</Card.Title>
            <Card.Description>Enter your information to create an account</Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="grid gap-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="grid gap-2">
                        <Label for="first-name">First name</Label>
                        <Input bind:value={firstName} id="first-name" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="last-name">Last name</Label>
                        <Input bind:value={lastName} id="last-name" required />
                    </div>
                </div>
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
                    <Label for="password">Password</Label>
                    <Input bind:value={password} id="password" type="password" />
                </div>
                <Button
                    on:click={() => {
                        createAccount();
                    }}
                    type="submit"
                    class="w-full"
                >
                    Create an account
                </Button>
            </div>
            <div class="mt-6 text-center text-sm">
                Already have an account?
                <a href="/login" class="underline">Sign in</a>
            </div>
        </Card.Content>
    </Card.Root>
</div>
