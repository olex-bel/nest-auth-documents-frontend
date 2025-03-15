
import { BaseService } from "./base.service";

export enum Permission {
    NO_PERMISSION = -1,
    SUPERVISE = 1,
    VIEW = 2,
    CONTRIBUT = 3,
}

type FolderPermission = {
    id: string;
    permission_id: Permission;
}

type FolderPermissionResponse = {
    permission: FolderPermission;
}

type DocumentPermission = {
    id: string;
    permission_id: Permission;
}

type DocumentPermissionResponse = {
    permission: DocumentPermission;
    isOwner: boolean;
}

export type User = {
    id: string;
    email: string;
    enabled: boolean;
};

type UserRoles = string[];

type UserResponse = {
    items: User[],
    newCursor?: string;
}

export default class UserService extends BaseService {
    constructor (token: string) {
        super(token);
    }

    async getFolderPermissions(folderId: string) {
        const url = this.getUrl(`users/folder-premissions/${folderId}`);
        const result = await this.get(url)
        return result as FolderPermissionResponse;
    }

    async getDocumentPermissions(documentId: string) {
        const url = this.getUrl(`users/document-permissions/${documentId}`);
        const result = await this.get(url)
        return result as DocumentPermissionResponse;
    }

    async getRoles() {
        const url = this.getUrl('users/roles');
        const result = await this.get(url)
        return result as UserRoles;
    }

    async getAllUsers(limit: number, cursor?: string) {
        const url = this.getUrlWithPagination('users/all', limit, undefined, cursor);
        const result = await this.get(url)
        return result as UserResponse;
    }

    async getUser(userId: string) {
        const url = this.getUrl(`users/${userId}`);
        const result = await this.get(url)
        return result as User;
    }
}