import { useRoles } from "~/hooks/useRoles";
import MainMenuLink from "./common/MainMenuLink";
import LogoutButton from "./common/LogoutButton";

export default function Header() {
    const roles = useRoles();
    const isAdmin = roles.includes('admin');

    return (
        <header>
            <nav className="bg-slate-200 p-4">
                <ul className="flex space-x-4 justify-center items-center">
                    <li><MainMenuLink to="/">Home</MainMenuLink></li>
                    {isAdmin && <li><MainMenuLink to="admin/users">Manage Users</MainMenuLink></li>}
                    {isAdmin && <li><MainMenuLink to="admin/folders">Manage Folders</MainMenuLink></li>}
                    <li><MainMenuLink to="/profile">Profile</MainMenuLink></li>
                    <li className="ml-2"><LogoutButton /></li>
                </ul>
            </nav>
        </header>
    );
} 