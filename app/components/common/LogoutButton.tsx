import { redirect } from "react-router";
import Authenticator from "~/services/authenticator";

export default function LogoutButton() {
    const authenticator = Authenticator.getInstance();
    const logout = () => {
        authenticator.logout();
        redirect("/signin");
    };

    return (
        <button className="bg-transparent hover:bg-slate-300 p-1" onClick={logout}>
            Logout
        </button>
    );
}