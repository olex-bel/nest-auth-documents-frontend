import { BaseService } from "./base.service";
import type { Permission } from "./user";

export type Folder = {
    id: string;
    name: string;
    permissionId: Permission;
}

type Document = {
    id: string;
    title: string;
};

type FolderResponse = {
    items: Folder[],
    newCursor?: string;
}

type FolderDocumentsResponse = {
    items: Document[],
    newCursor?: string;
}

export class FolderService extends BaseService {
    constructor (token: string) {
        super(token);
    }

    async getFolders(limit: number, query?: string, cursor?: string) {
        const url = this.getUrlWithPagination('folder', limit, query, cursor);
        const result = await this.get(url)
        return result as FolderResponse;
    }

    async getFolderDocuments(foldeId: string, limit: number, query?: string, cursor?: string) {
        const url = this.getUrlWithPagination(`folder/${foldeId}`, limit, query, cursor);
        const result = await this.get(url)
        return result as FolderDocumentsResponse;
    }

    async getAllFolders(limit: number, query?: string, cursor?: string) {
        const url = this.getUrlWithPagination('folder/all', limit, query, cursor);
        const result = await this.get(url)
        return result as FolderResponse;
    }
}

