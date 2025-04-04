export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
    }
}

export class AccessDeniedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AccessDeniedError';
    }
}