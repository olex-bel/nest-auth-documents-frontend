import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/edit-document";
import DocumentForm from "~/components/common/DocumentForm";
import Authenticator from "~/services/authenticator";
import { DocumentService } from "~/services/documents/document";

export function meta() {
    return [
        { title: "Edit document" },
        { name: "description", content: "Welcome to document editor!" },
    ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const authenticator = Authenticator.getInstance()
    const documentResponse = authenticator.authenticatedRequest(DocumentService, async (service) => {
        return service.getDocument(params.documentId!);
    });
    
    return documentResponse;
}

export async function clientAction({
    request,
    params,
  }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const previousChecksum = formData.get("previousChecksum") as string;
    const authenticator = Authenticator.getInstance();
    
    await authenticator.authenticatedRequest(DocumentService, async (service) => {
       return service.updateDocument(params.documentId!, title, content, previousChecksum);
    });

    throw redirect(`/folders/${params.folderId!}`);
}

export default function EditDocument({ loaderData }: Route.ComponentProps) {
    const { title, content, checksum } = loaderData;
    const navigate = useNavigate();

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <div className="flex flex-col gap-4">
            <h1>Edit Document</h1>
            <DocumentForm title={title} content={content} previousChecksum={checksum} onCancel={onCancel} />
        </div>
    );
}