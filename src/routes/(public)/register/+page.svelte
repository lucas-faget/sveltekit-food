<script>
    import UserAuthForm from "$lib/components/UserAuthForm.svelte";
</script>

<div class="p-4 sm:p-8">
    <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-96">
        <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-3xl font-bold tracking-tight">Sign Up</h1>
            <p class="text-muted-foreground px-8 text-base">
                Complete the form below to create your account
            </p>
        </div>
        <UserAuthForm registration />
        <p class="text-muted-foreground px-8 text-center text-sm">
            Already have an account?
            <a href="/login" class="hover:text-primary underline underline-offset-4"> Sign In </a>
        </p>
    </div>
</div>
