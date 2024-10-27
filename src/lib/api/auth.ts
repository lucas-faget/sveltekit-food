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
 * Login
 * @param email
 * @param password
 */
export async function login(email: string, password: string) {
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
        return {
            success: true,
            message: data.message,
        };
    } else {
        return {
            success: false,
            message: data.message,
        };
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
    } else {
        console.error("Failed to logged out");
    }
}
