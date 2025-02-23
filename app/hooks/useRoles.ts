import { useEffect, useState } from "react";
import Authenticator from "~/services/authenticator";
import UserService from "~/services/documents/user";

export function useRoles() {
    const [roles, setRoles] = useState<string[]>([]);
    const authenticator = Authenticator.getInstance()
    const token = authenticator.getToken();

    useEffect(() => {
        async function fetchRoles() {
            if (token) {
                const userService = new UserService(token);
                const roles = await userService.getRoles();
                setRoles(roles);
            } else {
                setRoles([]);
            }
        }

        fetchRoles();
    }, [token])

    return roles;
}