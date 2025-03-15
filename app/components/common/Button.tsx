
import type { ReactNode } from "react";
import type { ButtonHTMLAttributes  } from "react";

export enum ButtonType {
    Primary = "primary",
    Danger = "danger",
    Flat = "flat", 
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    buttonType?: ButtonType;
    children: ReactNode;
};

export default function Button({ children, buttonType, className, ...props }: ButtonProps) {
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

    const classes = `${typeClasses} rounded px-3 py-2 disabled:opacity-60 ${className || ""}`;

    return (
        <button {...props} className={classes}>
            {children}
        </button>
    );
}