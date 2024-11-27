<script>
    import UserAuthForm from "$lib/components/UserAuthForm.svelte";
    import backgroundImage from "$lib/images/food.jpg";

    let backgroundStyle = `background-image: url(${backgroundImage}); background-size: cover; background-position: center;`;
</script>

<div class="flex-1 w-full lg:grid lg:grid-cols-2">
    <div class="flex items-center justify-center py-12">
        <div class="mx-auto grid w-96 gap-6">
            <div class="grid gap-2 text-center">
                <h1 class="text-3xl font-bold">Sign In</h1>
                <p class="text-muted-foreground px-8 text-base">
                    Enter your email and your password to login to your account
                </p>
            </div>
            <UserAuthForm />
            <p class="text-muted-foreground px-8 text-center text-sm">
                Dont have an account?
                <a href="/register" class="hover:text-primary underline underline-offset-4">
                    Sign Up
                </a>
            </p>
        </div>
    </div>

    <div class="bg-muted hidden lg:block" style={backgroundStyle}></div>
</div>
