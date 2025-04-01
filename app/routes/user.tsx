import { Outlet } from "react-router";
import Authenticator from "~/services/authenticator";
import { AdminService } from "~/services/documents/admin";
import UserInformation from "~/components/admin/user/UserInformation";
import UserUpdateStatusForm from "~/components/admin/user/UserUpdateStatusForm";
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

    return { user };
}

export async function clientAction({ request, params }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const action = formData.get("action") as string;
    const userId = params.userId as string;
    const authenticator = Authenticator.getInstance();

    if (action === "update-status") {
        const enabled = formData.get("enabled") === "on";
        try {
            await authenticator.authenticatedRequest(AdminService, async (service) => {
                await service.updateUserStatus(userId, enabled);
            });
        } catch (error) {
            return { errorMessage: "An error occurred while updating the user status. Please try later." };
        }
    } else {
        throw new Error(`Invalid action: ${action}`);
    }
}


export default function User({ loaderData }: Route.ComponentProps) {
    const { user } = loaderData;

    return (
        <div>
            <div className="md:flex md:flex-row gap-4">
                <UserInformation user={user} />
                <UserUpdateStatusForm user={user} />
            </div>
        
            <Outlet />
        </div>
    )
}