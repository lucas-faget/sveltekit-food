export async function searchFood(query: string, page: number = 1) {
    if (page > 0) {
        const response = await fetch(`http://localhost:8000/api/off/food/search/${query}/${page}`);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        return await response.json();
    } else {
        throw new Error("Invalid page number");
    }
}
