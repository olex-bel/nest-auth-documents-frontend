import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <main className="flex justify-center items-center min-h-screen w-full font-inter">
            <Outlet />
        </main>
    );
}