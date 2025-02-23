import Authenticator from "~/services/authenticator";
import { DocumentService } from "~/services/documents/document";
import LinkButton, { ButtonType } from "~/components/common/LinkButton";
import type { Route } from "./+types/document";
import { useDocumentPermission } from "~/hooks/useDocumentPermissions";
import { Permission } from "~/services/documents/user";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Document editor" },
        { name: "description", content: "Welcome to document editor!" },
    ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const authenticator = Authenticator.getInstance()
    const documentResponse = await authenticator.authenticatedRequest(DocumentService, async (service) => {
        return service.getDocument(params.documentId!);
    });

    return documentResponse;    
}

export default function Document({ loaderData }: Route.ComponentProps) {
    const { title, content } = loaderData;
    const [permission, isOwner] = useDocumentPermission(loaderData.id);
    const canManageDocument = (permission === Permission.SUPERVISE) || (permission === Permission.CONTRIBUT && isOwner);

    return (
        <div className="flex flex-col gap-2 h-full">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg border rounded grow">{content}</p>
            <div className="flex gap-2 mt-4">
                <LinkButton to="./edit" disabled={!canManageDocument}>Edit</LinkButton>
                <LinkButton to="./delete" buttonType={ButtonType.Danger} disabled={!canManageDocument}>Delete</LinkButton>
            </div>
        </div>
    );
}
