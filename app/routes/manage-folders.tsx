import { Link } from "react-router";
import Authenticator from "~/services/authenticator";
import { AdminService } from "~/services/documents/admin";
import { FolderService } from "~/services/documents/folder";
import FoldersTable from "~/components/admin/folders/FoldersTable";
import CreateFolderButton from "~/components/admin/folders/CreateFolderButton";
import SearchForm from "~/components/common/SearchForm";
import Actions from "~/components/admin/folders/Actions";
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
        return service.getAllFolders({limit: 10, query, cursor});
    });

    return folderResponse;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const action = formData.get("action") as string;

    if (action === "delete") {
        const folderId = formData.get("folderId") as string;
        try {
            await Authenticator.getInstance().authenticatedRequest(FolderService, async (service) => {
                await service.deleteFolder(folderId);
            });
        } catch (error) {
            return { errorMessage: "An error occurred while deleting the folder. Please try later." };
        }
    } else if (action === "rename") {
        const folderId = formData.get("folderId") as string;
        const folderName = formData.get("folderName") as string;

        try {
            await Authenticator.getInstance().authenticatedRequest(FolderService, async (service) => {
                await service.renameFolder(folderId, folderName);
            });       
        } catch (error) {
            return { errorMessage: "An error occurred while renaming the folder. Please try later." };
        }
    } else if (action === "create") {
        const folderName = formData.get("folderName") as string;

        try {
            await Authenticator.getInstance().authenticatedRequest(FolderService, async (service) => {
                await service.createFolder(folderName);
            });
        } catch (error) {
            return { errorMessage: "An error occurred while creating the folder. Please try later." };
        }
    } else {
        throw new Error(`Invalid action: ${action}`);
    }

    return null;
}

export default function ManageFolders({ loaderData }: Route.ComponentProps) {
    const { items, newCursor } = loaderData;

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

            <FoldersTable items={items} actionsComponent={Actions} />
        </>
        
    );
}