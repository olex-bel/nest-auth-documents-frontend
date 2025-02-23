import type { ReactNode } from "react";
import type { InputHTMLAttributes  } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props}: InputProps) {
    const classes = `rounded border p-2 ${className || ""}`;

    return (
        <input className={classes} {...props} />
    );

}