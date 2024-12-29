import axios from "axios";
import { toast } from "svelte-sonner";

export async function createIntake(productId: number, amount: number) {
    try {
        const response = await axios.post("http://localhost:8000/api/intakes", {
            product_id: productId,
            amount,
        });

        toast.success("Intake created");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error("Failed to create intake");
            // throw new Error(`Failed to create intake: ${error.response?.data || error.message}`);
        } else {
            toast.error("An unexpected error occurred");
            // throw new Error("An unexpected error occurred");
        }
    }
}
