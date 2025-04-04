
import { redirect } from "react-router";
import { AuthTokenStorage } from "./authTokenStorage";
import { UnauthorizedError, AccessDeniedError } from "./documents/errors";
import { login } from "./documents/auth";

export default class Authenticator {
    private tokenStorage: AuthTokenStorage;
    private static instance: Authenticator;

    private constructor () {
        this.tokenStorage = new AuthTokenStorage();
    }

    static getInstance() {
        if (!Authenticator.instance) {
            Authenticator.instance = new Authenticator();
        }

        return Authenticator.instance;
    }

    isAuthenticated() {
        const token = this.getToken()

        return !!token;
    }

    getToken() {
        return this.tokenStorage.getToken() || null;
    }

    async authenticate(email: string, password: string) {
        const token = await login(email, password);

        if (!token) {
            throw new Error("Authentication failed");
        }

        this.tokenStorage.setToken(token);
    }

    logout() {
        this.tokenStorage.removeToken();
    }

    async authenticatedRequest<T, S>(ServiceClass: new (token: string) => S, serviceCall: (service: S) => Promise<T>): Promise<T> {
        const token = this.getToken();

        if (!token) {
            throw redirect("/login");
        }

        const service = new ServiceClass(token);

        try {
            return await serviceCall(service);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                this.logout();
                throw redirect("/login");
            }
            if (error instanceof AccessDeniedError) {
                throw redirect("/");
            }

            throw error;
        }
    }
}
