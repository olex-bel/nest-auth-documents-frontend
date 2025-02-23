import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/add-document";
import Authenticator from "~/services/authenticator";
import { DocumentService } from "~/services/documents/document";
import DocumentForm from "~/components/common/DocumentForm";

export function meta() {
    return [
        { title: "Create a new document" },
        { name: "description", content: "Welcome to document editor!" },
    ];
}

export async function clientLoader() {
    const authenticator = Authenticator.getInstance()
    const token = authenticator.getToken();

    if (!token) {
        throw redirect("/login");
    }
}

export async function clientAction({
    request,
    params,
  }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const authenticator = Authenticator.getInstance();
   
    await authenticator.authenticatedRequest(DocumentService, async (service) => {
        return service.createDocument(params.folderId!, title, content);
    });

    throw redirect(`/folders/${params.folderId!}`);
}

export default function AddDocument() {
    const navigate = useNavigate();

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <div className="flex flex-col gap-2 h-full">
            <DocumentForm onCancel={onCancel} />
        </div>
    );
}
