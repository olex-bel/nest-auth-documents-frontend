import { Link } from "react-router";
import UsersTable from "~/components/admin/users/UsersTable";
import Authenticator from "~/services/authenticator";
import UserService from "~/services/documents/user";
import type { Route } from "./+types/manage-users";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Manage users" },
        { name: "description", content: "Welcome to document editor!" },
    ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
    const authenticator = Authenticator.getInstance();
    const searchParams = new URL(request.url).searchParams;
    const cursor = searchParams.get("cursor") as string;
    const folderResponse = await authenticator.authenticatedRequest(UserService, async (service) => {
        return service.getAllUsers(10, cursor);
    });
    return folderResponse;
}

export default function ManageUsers({ loaderData }: Route.ComponentProps) {
    const { items, newCursor } = loaderData;

    return (
        <>
            <div>
                {
                    newCursor? 
                        <Link to={`./?cursor=${newCursor}`} className="font-bold underline ml-auto">Next &gt;&gt;</Link>
                        : 
                        null
                }
            </div>

            <UsersTable items={items} />
        </>
    );
}