import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
    const { id } = params;

    const response = await fetch(`http://localhost:8000/api/off/food/${id}`);
    const product = await response.json();
    return { product };
};
