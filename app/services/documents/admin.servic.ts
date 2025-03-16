import { BaseService } from "./base.service";
import type { FolderResponse } from "./folder";
import type { User } from "./user";

type GetFoldersOptions = {
    userId?: string;
    limit: number;
    cursor?: string;
    query?: string;
};

type UserResponse = {
    items: User[],
    newCursor?: string;
}

export class AdminService extends BaseService {
    constructor (token: string) {
        super(token);
    }

    async getFolders({ userId, limit, cursor, query }: GetFoldersOptions) {
        const url = this.getUrlWithPagination('folder/all', { limit, cursor }, { query, userId });
        const result = await this.get(url)
        return result as FolderResponse;
    }

    async getUsers(limit: number, cursor?: string) {
        const url = this.getUrlWithPagination('users/all', { limit, cursor });
        const result = await this.get(url)
        return result as UserResponse;
    }

    async getUser(userId: string) {
        const url = this.getUrl(`users/${userId}`);
        const result = await this.get(url)
        return result as User;
    }
}
