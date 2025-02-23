import { Outlet, redirect, Link } from "react-router";
import Authenticator from "~/services/authenticator";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Breadcrumbs from "~/components/Breadcrumbs";

export const handle = {
    breadcrumbs: () => "Home",
};

export async function clientLoader() {
    const authenticator = Authenticator.getInstance()

    if (!authenticator.isAuthenticated()) {
        throw redirect("/login");
    }
}

export default function AppLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="w-full flex-grow w-4/5 md:w-3/5 mx-auto">
                <Breadcrumbs />
                <section className="w-full h-full">
                    <Outlet/>
                </section>
            </main>
            <Footer />
        </div>
    );
}