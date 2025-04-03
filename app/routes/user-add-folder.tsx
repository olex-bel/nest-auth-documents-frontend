import React from "react";
import { Await, Link, redirect } from "react-router";
import FoldersTable from "../components/admin/folders/FoldersTable";
import FoldersTableSkeleton from "~/components/skeleton/FoldersTableSkeleton";
import UnassignedFolderActions from "~/components/admin/user/UnassignedFolderActions";
import SearchForm from "../components/common/SearchForm";
import Authenticator from "../services/authenticator";
import { AdminService } from "../services/documents/admin";
import type { Route } from "./+types/user-add-folder";

export async function clientLoader({ request, params }: Route.ClientLoaderArgs) {
    const authenticator = Authenticator.getInstance();
    const searchParams = new URL(request.url).searchParams;
    const cursor = searchParams.get("cursor") as string;
    const query = searchParams.get("query") as string;
    const folderResponse = authenticator.authenticatedRequest(AdminService, async (service) => {
        return service.getUserFolders({ limit: 10, query, cursor, userId: params.userId, assigned: false });
    });

    return { folders: folderResponse };
}

export async function clientAction({ request, params }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const action = formData.get("action") as string;
    const userId = params.userId as string;
    const authenticator = Authenticator.getInstance();
    
    if (action === "assign-folder") {
        const folderId = formData.get("folderId") as string;
        const permissionId = formData.get("permissionId") as string;
        
        try {
            await authenticator.authenticatedRequest(AdminService, async (service) => {
                await service.updateFolderPermission(userId, folderId, permissionId);
            });

            return redirect('..');
        } catch (error) {
            return { errorMessage: "An error occurred while assigning the folder. Please try later." };
        }
    } else {
        throw new Error(`Invalid action: ${action}`);
    }
}

export default function UserAddFolder({ loaderData }: Route.ComponentProps) {
    const { folders } = loaderData;

    return (
        <React.Suspense fallback={<FoldersTableSkeleton />}>
            <Await resolve={folders}>
                {({ items, newCursor }) => 
                    (
                        <>
                            <div className="flex items-center p-2 gap-2 justify-space-between">
                                <SearchForm />

                                {
                                    newCursor? 
                                        <Link to={`./?cursor=${newCursor}`} className="font-bold underline ml-auto">Next &gt;&gt;</Link>
                                        : 
                                        null
                                }
                            </div>
                            <FoldersTable items={items} actionsComponent={UnassignedFolderActions} />
                        </>
                    )
                }
            </Await>
        </React.Suspense>
    )
}