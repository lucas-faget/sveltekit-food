import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

/**
 * Check if the user is already authenticated
 * If authenticated, redirect them to the homepage
 */
export const load: LayoutServerLoad = async ({ fetch }) => {
    const response = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        credentials: "include",
    });

    if (response.ok) {
        throw redirect(301, "/");
    }

    return {};
};
