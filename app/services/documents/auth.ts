import { SERVICE_BASE_URL } from "./constants";
import { UnauthorizedError } from "./errors";

export async function login(email: string, password: string) {
    const response = await fetch(`${SERVICE_BASE_URL}/auth/login`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password })
    });

    if (response.status === 401) {
        throw new UnauthorizedError("Invalid email or password.");
    }

    if (response.status === 403) {
        throw new UnauthorizedError("Account is disabled. Please contact support.");
    }

    if (!response.ok) {
        throw new Error("An error occurred during login. Please try again.");
    }

    const json = await response.json();

    return json.access_token;
}
