import { useRef } from "react";
import { useRoles } from "~/hooks/useRoles";
import Button from "../../common/Button";
import ModalCreateFolder from "./ModalCreateFolder";

export default function CreateFolderButton() {
    const roles = useRoles();
    const canCreateFolder = roles.includes('admin');
    const createDialogRef = useRef<HTMLDialogElement>(null);

    return (
        <>
            <Button disabled={!canCreateFolder} onClick={() => createDialogRef.current?.showModal()}>
                Create folder
            </Button>
            <ModalCreateFolder ref={createDialogRef} />
        </>
    );
}
