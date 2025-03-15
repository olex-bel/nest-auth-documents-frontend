import { NavLink } from "react-router";

type MainMenuLinkProps = {
    to: string;
    children: React.ReactNode;
}

export default function MainMenuLink({ to, children }: MainMenuLinkProps) {
    return (
        <NavLink to={to} className={({ isActive, isPending }) =>
            [
                isPending ? "animate-pulse" : "",
                isActive ? "font-bold" : "",
            ].join(" ")
        }>{children}</NavLink>
    );
}