import type { ReactNode } from "react";
import { Link } from "react-router";

export enum ButtonType {
    Primary = "primary",
    Danger = "danger",
};

type ButtonProps = {
    buttonType?: ButtonType;
    to: string;
    children: ReactNode;
    disabled?: boolean;
    className?: string;
};

export default function LinkButton({ to, children, buttonType, disabled, className }: ButtonProps) {
    let typeClasses = "";

    switch (buttonType) {
        case ButtonType.Danger:
            typeClasses = "bg-red-500 enabled:hover:bg-red-400 text-slate-50";
            break;
        case ButtonType.Primary:
        default:
            typeClasses = "bg-sky-500 enabled:hover:bg-sky-400 text-slate-50";
            break;
    }

    const classes = `${typeClasses} rounded px-3 py-2 border-solid ${className || ""} ${disabled? "opacity-60": ""}`;

    return (
        <>
            {
                disabled?
                    (<span className={classes}>
                        {children}
                    </span>)
                    :
                    <Link to={to} className={classes}>
                        {children}
                    </Link>
            }
        </>
    );
}