import { useEffect, useState } from "react";
import Authenticator from "~/services/authenticator";
import UserService, { Permission } from "~/services/documents/user";

type PermissionState = {
    permission: number;
    isOwner: boolean;
};

const defaultPermissionState: PermissionState = {
    permission: Permission.NO_PERMISSION,
    isOwner: false,
};

export function useDocumentPermission(documentId: string): [number, boolean] {
    const [permission, setPermission] = useState<PermissionState>(defaultPermissionState);
    const authenticator = Authenticator.getInstance()
    const token = authenticator.getToken();

    useEffect(() => {
        async function fetchPermissions() {
            if (token) {
                const userService = new UserService(token);
                const { permission, isOwner } = await userService.getDocumentPermissions(documentId);
                setPermission({ permission: permission.permission_id, isOwner });
            } else {
                setPermission(defaultPermissionState);
            }
        }

        fetchPermissions();
    }, [token, documentId]);

    return [permission.permission, permission.isOwner];
}
