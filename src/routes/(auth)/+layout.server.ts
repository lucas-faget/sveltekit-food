import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ fetch }) => {
    const response = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        credentials: "include",
    });

    if (response.ok) {
        const user = await response.json();
        return { user };
    }

    throw redirect(302, "/login");
};
