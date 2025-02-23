
import { BaseService } from "./base.service";

export type DocumentResponse = {
    id: string;
    title: string;
    content: string;
    userId: string;
    folderId: string;
    createdAt: Date;
    updatedAt: Date;
    checksum: string;
};

export class DocumentService extends BaseService {
    constructor(token: string) {
        super(token);
    }

    async getDocument(documentId: string) {
        const url = this.getUrl(`document/${documentId}`);
        const result = await this.get(url);
        return result as DocumentResponse;
    }

    async createDocument(folderId: string, title: string, content: string) {
        const url = this.getUrl(`document/${folderId}`);
        const result = await this.post(url, { title, content });
        return result as DocumentResponse;
    }

    async updateDocument(documentId: string, title: string, content: string, previousChecksum: string) {
        const url = this.getUrl(`document/${documentId}`);
        const result = await this.patch(url, { title, content, previousChecksum });
        return result as DocumentResponse;
    }
}