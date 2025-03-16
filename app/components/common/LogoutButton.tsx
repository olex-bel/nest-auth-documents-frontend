import { useNavigate  } from "react-router";
import Authenticator from "~/services/authenticator";

export default function LogoutButton() {
    const navigate = useNavigate();
    const authenticator = Authenticator.getInstance();
    const logout = () => {
        authenticator.logout();
        navigate("/login");
    };

    return (
        <button className="bg-transparent hover:bg-slate-300 p-1" onClick={logout}>
            Logout
        </button>
    );
}