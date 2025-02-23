import { redirect, Link } from "react-router";
import type { Route } from "./+types/home";
import Authenticator from "~/services/authenticator";
import { FolderService } from "~/services/documents/folder";
import Actions from "~/components/home/Actions";
import CreateFolderButton from "~/components/home/CreateFolderButton";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Document editor" },
        { name: "description", content: "Welcome to document editor!" },
    ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
    const authenticator = Authenticator.getInstance()
    const token = authenticator.getToken();
    
    if (!token) {
        throw redirect("/login");
    }
    const searchParams = new URL(request.url).searchParams;
    const cursor = searchParams.get('cursor') as string;
    const documentService = new FolderService(token);

    const folderResponse =  await documentService.getFolders(10, cursor);

    return folderResponse;
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const { items, newCursor } = loaderData;

    if (!items.length) {
        return <div>No folders available to display.</div>
    }

    return (
        <>

            <div className="flex justify-between items-center p-2">
                <CreateFolderButton />
                {
                    newCursor? 
                        <Link to={`/?cursor=${newCursor}`} className="font-bold underline">Next &gt;&gt;</Link>
                        : 
                        null
                }
            </div>

            <table className="table-autotext-left rtl:text-right text-gray-800 text-lg w-full rounded">
                <thead className="uppercase font-bold bg-slate-200">
                    <tr>
                        <th scope="col" className="px-3 py-1.5 md:px-6 md:py-3">ID</th>
                        <th scope="col" className="px-3 py-1.5 md:px-6 md:py-3 w-3/5">Name</th>
                        <th scope="col" className="px-3 py-1.5 md:px-6 md:py-3">Actions</th>
                    </tr>
                </thead>

                <tbody className="bg-slate-100">
                    {
                        items.map(folder => (
                            <tr key={folder.id} className="border-b border-slate-200">
                                <td className="px-2 py-1 md:px-4 md:py-2">{folder.id}</td>
                                <td className="px-2 py-1 md:px-4 md:py-2"><Link to={`/folders/${folder.id}`}>{folder.name}</Link></td>
                                <td className="px-2 py-1 md:px-4 md:py-2"><Actions folderId={folder.id} permissionId={folder.permissionId} /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            
        </>
    )
}
