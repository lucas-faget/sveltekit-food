import axios from "axios";
import type { Product } from "$lib/types";
import { toast } from "svelte-sonner";

axios.defaults.withCredentials = true;

export async function searchProducts(query: string = "", page: number = 1) {
    if (page > 0) {
        try {
            const response = await axios.get("http://localhost:8000/api/products/search", {
                params: {
                    query: query,
                    page: page,
                },
            });

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // throw new Error(
                //     `Failed to fetch products: ${error.response?.data || error.message}`
                // );
            } else {
                // throw new Error("An unexpected error occurred");
            }
        }
    } else {
        // throw new Error("Invalid page number");
    }
}

export async function createProduct(product: Product) {
    try {
        const response = await axios.post("http://localhost:8000/api/products", product);

        toast.success("Product created");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error("Failed to create product");
            // throw new Error(`Failed to create product: ${error.response?.data || error.message}`);
        } else {
            toast.error("An unexpected error occurred");
            // throw new Error("An unexpected error occurred");
        }
    }
}

export async function deleteProduct(id: number) {
    try {
        const response = await axios.delete(`http://localhost:8000/api/products/${id}`);
        if (response.status === 204) {
            toast.success("Product deleted");
            return true;
        } else {
            toast.error("Failed to delete product");
            return false;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error("Failed to delete product");
            // throw new Error(`Failed to delete product: ${error.response?.data || error.message}`);
        } else {
            toast.error("An unexpected error occurred");
            // throw new Error("An unexpected error occurred");
        }

        return false;
    }
}
