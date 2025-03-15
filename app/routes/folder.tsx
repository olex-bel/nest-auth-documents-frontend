import { useNavigate, Link } from "react-router";
import type { Route } from "./+types/folder";
import { useFolderPermission } from "~/hooks/useFolderPermissions";
import Button from "~/components/common/Button";
import Authenticator from "~/services/authenticator";
import { FolderService } from "~/services/documents/folder";
import { Permission } from "~/services/documents/user";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Document editor" },
        { name: "description", content: "Welcome to document editor!" },
    ];
}

export async function clientLoader({ request, params }: Route.ClientLoaderArgs) {
    const authenticator = Authenticator.getInstance()
    const searchParams = new URL(request.url).searchParams;
    const cursor = searchParams.get('cursor') as string;
    const documentListResponse = await authenticator.authenticatedRequest(FolderService, async (service) => {
        return service.getFolderDocuments(params.folderId!, 10, cursor);
    });

    return documentListResponse;
}

export default function Folder({ loaderData, params }: Route.ComponentProps) {
    const navigate = useNavigate();
    const permission = useFolderPermission(params.folderId!);
    const { items, newCursor } = loaderData;
    const canCreateDocument = permission === Permission.SUPERVISE || permission === Permission.CONTRIBUT;

    const handleCreateDocument = () => {
        navigate(`/folders/${params.folderId!}/add-document`);
    };

    return (
        <>
            <div className="flex justify-between items-center p-2">
                <Button disabled={!canCreateDocument} onClick={handleCreateDocument}>
                    Create document
                </Button>
                {
                    newCursor? 
                        <Link to={`/folders/${params.folderId!}/?cursor=${newCursor}`} className="font-bold underline">Next &gt;&gt;</Link>
                        : 
                        null
                }
            </div>

            <table className="table-autotext-left rtl:text-right text-gray-800 text-lg w-full rounded">
                <thead className="uppercase font-bold bg-slate-200">
                    <tr>
                        <th scope="col" className="px-3 py-1.5 md:px-6 md:py-3">ID</th>
                        <th scope="col" className="px-3 py-1.5 md:px-6 md:py-3">Name</th>
                        <th scope="col" className="px-3 py-1.5 md:px-6 md:py-3">Actions</th>
                    </tr>
                </thead>

                <tbody className="bg-slate-100">
                    {
                        items.map(document => (
                            <tr key={document.id} className="border-b border-slate-200">
                                <td className="px-2 py-1 md:px-4 md:py-2">{document.id}</td>
                                <td className="px-2 py-1 md:px-4 md:py-2"><Link to={`./documents/${document.id}`}>{document.title}</Link></td>
                                <td></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {items.length === 0 && <div className="text-center text-lg text-gray-500 p-4">No documents found</div>}
        </>
    )
}