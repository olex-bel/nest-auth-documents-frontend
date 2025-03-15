import { forwardRef } from "react";
import type { InputHTMLAttributes  } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input =  forwardRef(function Input({ className, ...props}: InputProps, ref: React.Ref<HTMLInputElement>) {
    const classes = `rounded border p-2 ${className || ""}`;

    return (
        <input ref={ref} className={classes} {...props} />
    );
});

export default Input;