import { goto } from "$app/navigation";

/**
 * Get CSRF token
 */
export async function getCsrfToken() {
    const response = await fetch(`http://localhost:8000/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Unable to fetch CSRF token.");
    }
}

/**
 * Create an account
 * @param name
 * @param email
 * @param password
 */
export async function register(name: string, email: string, password: string) {
    const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });

    const data = await response.json();

    if (response.ok) {
        console.log(data.user);
        await goto("/login");
    } else {
        return data;
    }
}

/**
 * Login
 * @param email
 * @param password
 */
export async function login(email: string, password: string) {
    await getCsrfToken();

    const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (response.ok) {
        console.log("User succesfully logged in");
        await goto("/");
    } else {
        return data;
    }
}

/**
 * Logout
 */
export async function logout() {
    const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include",
    });

    if (response.ok) {
        console.log("User succesfully logged out");
        await goto("/login");
    } else {
        console.error("Failed to log out");
    }
}
