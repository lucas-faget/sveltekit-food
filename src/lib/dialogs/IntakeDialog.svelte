<script lang="ts">
    import type { DateValue } from "@internationalized/date";
    import { LoaderCircle } from "lucide-svelte";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Label from "$lib/components/ui/label/label.svelte";

    import DatePicker from "$lib/components/DatePicker.svelte";
    import { createIntake } from "$lib/api/intake";

    export let open: boolean = false;
    export let productId: number | undefined = undefined;

    let amount: number = 0;
    let date: DateValue | undefined = undefined;
    let isLoading: boolean = false;

    const handleIntakeCreation = async () => {
        if (productId) {
            try {
                isLoading = true;
                await createIntake(productId, amount);
            } finally {
                isLoading = false;
                open = false;
            }
        }
    };
</script>

<Dialog.Root bind:open>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>Create an intake</Dialog.Title>
            <Dialog.Description>Add an intake by entering an amount and a date.</Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
                <Label for="amount" class="text-right">Amount</Label>
                <Input id="amount" bind:value={amount} class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
                <Label class="text-right">Date</Label>
                <DatePicker bind:value={date} />
            </div>
        </div>
        <Dialog.Footer>
            <Button type="submit" on:click={() => handleIntakeCreation()}>
                {#if isLoading}
                    <LoaderCircle class="mr-2 h-5 w-5 animate-spin" />
                {/if}
                Add intake
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
