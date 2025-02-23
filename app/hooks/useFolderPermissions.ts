import { useEffect, useState } from "react";
import Authenticator from "~/services/authenticator";
import UserService, { Permission } from "~/services/documents/user";

export function useFolderPermission(folderId: string) {
    const [permission, setPermission] = useState<number>(Permission.NO_PERMISSION);
    const authenticator = Authenticator.getInstance()
    const token = authenticator.getToken();

    useEffect(() => {
        async function fetchPermissions() {
            if (token) {
                const userService = new UserService(token);
                const { permission } = await userService.getFolderPermissions(folderId);
                setPermission(permission.permission_id);
            } else {
                setPermission(Permission.NO_PERMISSION);
            }
        }

        fetchPermissions();
    }, [token, folderId]);

    return permission;
}
