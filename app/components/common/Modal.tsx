import { createPortal } from "react-dom";

type ModalProps = {
    children: React.ReactNode;
    ref: React.RefObject<HTMLDialogElement | null>;
    onClose?: () => void;
}


export default function Modal({ children, ref, onClose }: ModalProps) {
    return createPortal(
        <dialog ref={ref} className="p-6 bg-white rounded shadow-lg w-96" onCancel={onClose}>
            {children}
        </dialog>,
        document.getElementById("modal") as HTMLElement
    );
}
