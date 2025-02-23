
export class AuthTokenStorage {
    private tokenKey = 'authToken';

    setToken(token: string): void {
        sessionStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return sessionStorage.getItem(this.tokenKey);
    }

    removeToken(): void {
        sessionStorage.removeItem(this.tokenKey);
    }
}
