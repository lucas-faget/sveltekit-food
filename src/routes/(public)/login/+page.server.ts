import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        credentials: "include",
    });

    if (response.ok) {
        throw redirect(301, "/");
    }

    return {};
};
