
import { redirect } from "react-router";
import Authenticator from "~/services/authenticator";

export async function clientLoader() {
    const auth = Authenticator.getInstance();
    auth.logout();
    throw redirect("/login");
}   