import { BaseService } from "./base.service";
import type { Permission } from "./user";

type Folder = {
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

    async getFolders(limit: number, cursor?: string) {
        const url = this.getUrlWithPagination('folder', limit, cursor);
        const result = await this.get(url)
        return result as FolderResponse;
    }

    async getFolderDcoments(foldeId: string, limit: number, cursor?: string) {
        const url = this.getUrlWithPagination(`folder/${foldeId}`, limit, cursor);
        const result = await this.get(url)
        return result as FolderDocumentsResponse;
    }
}

