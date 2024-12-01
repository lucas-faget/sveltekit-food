import axios from "axios";

export async function searchFood(query: string = "", page: number = 1) {
    if (page > 0) {
        try {
            const response = await axios.get("http://localhost:8000/api/off/food/search", {
                params: {
                    query: query,
                    page: page,
                },
            });

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    `Failed to fetch products: ${error.response?.data || error.message}`
                );
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    } else {
        throw new Error("Invalid page number");
    }
}
