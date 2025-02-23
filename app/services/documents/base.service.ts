import { SERVICE_BASE_URL } from "./constants";
import { UnauthorizedError } from "./errors";

export abstract class BaseService {
    protected token: string;

    constructor(token: string) {
        this.token = token;
    }

    private async request(method: string, url: string, body?: any) {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`,
            },
            method,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (response.status === 401) {
            throw new UnauthorizedError("Unauthorized: Invalid email or password");
        }

        if (!response.ok) {
            throw new Error("An error occurred. Please try again.");
        }

        if (response.status === 204) {
            return null;
        }

        return response.json();
    }

    protected async get(url: string) {
        return this.request("GET", url);
    }

    protected async post(url: string, body: any) {
        return this.request("POST", url, body);
    }

    protected async put(url: string, body: any) {
        return this.request("PUT", url, body);
    }

    protected async patch(url: string, body: any) {
        return this.request("PATCH", url, body);
    }

    protected async delete(url: string) {
        return this.request("DELETE", url);
    }

    protected getUrlWithPagination(path:string, limit: number, cursor?: string) {
        const params = new URLSearchParams({
            limit: limit.toString(),
        });

        if (cursor) {
            params.append("cursor", cursor);
        }

        return this.getUrl(path, params);
    }

    protected getUrl(path: string, params?: URLSearchParams) {
        if (params) {
            return `${SERVICE_BASE_URL}/${path}?${params.toString()}`;
        }

        return `${SERVICE_BASE_URL}/${path}`;
    }
}