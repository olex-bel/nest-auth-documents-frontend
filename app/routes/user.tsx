
import React from "react";
import { Form, Await } from "react-router";
import Authenticator from "~/services/authenticator";
import { AdminService } from "~/services/documents/admin.servic";
import Button from "~/components/common/Button";
import FoldersTable from "~/components/common/FoldersTable";
import FoldersTableSkeleton from "~/components/skeleton/FoldersTableSkeleton";
import type { Route } from "./+types/user";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "User" },
        { name: "description", content: "Welcome to document editor!" },
    ];
}   

export async function clientLoader({ request, params }: Route.ClientLoaderArgs) {
    const authenticator = Authenticator.getInstance();
    const user = await authenticator.authenticatedRequest(AdminService, async (service) => {
        return service.getUser(params.userId);
    });
    const searchParams = new URL(request.url).searchParams;
    const cursor = searchParams.get("cursor") as string;
    const query = searchParams.get("query") as string;
    const folderResponse = authenticator.authenticatedRequest(AdminService, async (service) => {
        return service.getFolders({ limit: 10, query, cursor, userId: params.userId });
    });

    return { user, folders: folderResponse };
}

export default function User({ loaderData }: Route.ComponentProps) {
    const { user, folders } = loaderData;

    return (
        <div>
            <h1 className="mb-5">{user.email}</h1>

            <Form>
                <div className="flex gap-2">
                    <label className="block flex items-center gap-1">
                        Enabled
                        <input type="checkbox" name="enabled" defaultChecked={user.enabled} />
                    </label>
                    <Button type="submit">Update</Button>
                </div>
            </Form>

            <React.Suspense fallback={<FoldersTableSkeleton />}>
                <Await resolve={folders}>
                    {({ items, newCursor }) => <FoldersTable items={items} showActions={true} />}
                </Await>
            </React.Suspense>
        </div>
    )
}