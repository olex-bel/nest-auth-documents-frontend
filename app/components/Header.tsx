
import { useRoles } from "~/hooks/useRoles";
import MainMenu from "./common/MainMenu";

export default function Header() {
    const roles = useRoles();
    const isAdmin = roles.includes('admin');

    return (
        <header>
            <nav className="bg-slate-200 p-4">
                <MainMenu isAdmin={isAdmin} />
            </nav>
        </header>
    );
} 