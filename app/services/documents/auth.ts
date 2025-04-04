import { SERVICE_BASE_URL } from "./constants";
import { UnauthorizedError, UserAlreadyExistsError } from "./errors";

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

export async function register(email: string, password: string) {
    const response = await fetch(`${SERVICE_BASE_URL}/auth/register`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password })
    });

    if (response.status === 409) {
        throw new UserAlreadyExistsError("User already exists. Please try a different email.");
    }

    if (!response.ok) {
        throw new Error("An error occurred during signup. Please try again.");
    }

    return await response.json();
}
