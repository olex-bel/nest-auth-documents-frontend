import { BaseService } from "./base";
import type { FolderResponse } from "./folder";
import type { User } from "./user";

type GetUserFoldersOptions = {
    userId?: string;
    limit: number;
    cursor?: string;
    query?: string;
    assigned?: boolean;
};

type GetAllFoldersOptions = {
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

    async getUserFolders({ userId, limit, cursor, query, assigned = true }: GetUserFoldersOptions) {
        const url = this.getUrlWithPagination(`users/${userId}/folders`, { limit, cursor }, { query, userId, assigned });
        const result = await this.get(url)
        return result as FolderResponse;
    }

    async getAllFolders({limit, cursor, query}: GetAllFoldersOptions) {
        const url = this.getUrlWithPagination('folder/all', { limit, cursor }, { query });
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

    async updateUserStatus(userId: string, enabled: boolean) {
        const url = this.getUrl(`users/${userId}`);
        const result = await this.patch(url, { enabled });
        return result as User;
    }

    async updateFolderPermission(userId: string, folderId: string, permissionId: string) {
        const url = this.getUrl(`folder/${folderId}/permissions`);
        const result = await this.put(url, { userId, permissionId });
        return result;
    }

    async revokeFolderPermission(userId: string, folderId: string) {
        const url = this.getUrl(`folder/${folderId}/permissions/${userId}`);
        const result = await this.delete(url);
        return result;  
    }
}
