
import { Link } from "react-router";
import Authenticator from "~/services/authenticator";
import { AdminService } from "~/services/documents/admin.servic";
import FoldersTable from "~/components/common/FoldersTable";
import CreateFolderButton from "~/components/admin/folders/CreateFolderButton";
import SearchForm from "~/components/common/SearchForm";
import { useRoles } from "~/hooks/useRoles";
import type { Route } from "./+types/manage-folders";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Manage folders" },
        { name: "description", content: "Welcome to document editor!" },
    ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
    const authenticator = Authenticator.getInstance()
    const searchParams = new URL(request.url).searchParams;
    const cursor = searchParams.get("cursor") as string;
    const query = searchParams.get("query") as string;
    const folderResponse = await authenticator.authenticatedRequest(AdminService, async (service) => {
        return service.getFolders({limit: 10, query, cursor});
    });

    return folderResponse;
}

export default function ManageFolders({ loaderData }: Route.ComponentProps) {
    const { items, newCursor } = loaderData;
    const roles = useRoles();
    const canManageFolders = roles.includes("admin");

    return (
        <>
            <div className="flex items-center p-2 gap-2">
                <CreateFolderButton />
                <SearchForm />
                {
                    newCursor? 
                        <Link to={`./?cursor=${newCursor}`} className="font-bold underline ml-auto">Next &gt;&gt;</Link>
                        : 
                        null
                }
            </div>

            <FoldersTable items={items} showActions={canManageFolders} />
        </>
        
    );
}