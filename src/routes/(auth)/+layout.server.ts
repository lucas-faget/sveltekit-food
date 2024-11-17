import { getCsrfToken } from "$lib/api/auth";
import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

/**
 * Check if the user is authenticated
 * If not authenticated, redirect them to the login page
 */
export const load: LayoutServerLoad = async ({ fetch }) => {
    await getCsrfToken();

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
