import React from "react";
import { Await } from "react-router";
import FoldersTable from "~/components/admin/folders/FoldersTable";
import FoldersTableSkeleton from "~/components/skeleton/FoldersTableSkeleton";
import Actions from "~/components/admin/user/Actions";
import Authenticator from "~/services/authenticator";
import { AdminService } from "~/services/documents/admin";
import type { Route } from "./+types/user-folders";

export async function clientLoader({ request, params }: Route.ClientLoaderArgs) {
    const authenticator = Authenticator.getInstance();
    const searchParams = new URL(request.url).searchParams;
    const cursor = searchParams.get("cursor") as string;
    const query = searchParams.get("query") as string;
    const folderResponse = authenticator.authenticatedRequest(AdminService, async (service) => {
        return service.getUserFolders({ limit: 10, query, cursor, userId: params.userId });
    });

    return { folders: folderResponse };
}

export async function clientAction({ request, params }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const action = formData.get("action") as string;
    const userId = params.userId as string;
    const authenticator = Authenticator.getInstance();

    if (action === "update-permissions") {
        const folderId = formData.get("folderId") as string;
        const permissionId = formData.get("permissionId") as string;
        try {
            await authenticator.authenticatedRequest(AdminService, async (service) => {
                await service.updateFolderPermission(userId, folderId, permissionId);
            });
        } catch (error) {
            return { errorMessage: "An error occurred while updating the folder permissions. Please try later." };
        }
    } else if (action === "revoke-permissions") {
        const folderId = formData.get("folderId") as string;
        try {
            await authenticator.authenticatedRequest(AdminService, async (service) => {
                await service.revokeFolderPermission(userId, folderId);
            });
        } catch (error) {
            return { errorMessage: "An error occurred while revoking the folder permissions. Please try later." };
        }
    } else {
        throw new Error(`Invalid action: ${action}`);
    }
}

export default function UserFolders({ loaderData }: Route.ComponentProps) {
    const { folders } = loaderData;

    return (
        <React.Suspense fallback={<FoldersTableSkeleton />}>
            <Await resolve={folders}>
                {({ items, newCursor }) => <FoldersTable items={items} actionsComponent={Actions} />}
            </Await>
        </React.Suspense>
    );
}
