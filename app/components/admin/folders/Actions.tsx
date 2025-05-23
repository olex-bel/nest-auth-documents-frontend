import { useRef } from "react";
import ModalDeleteFolder from "./ModalDeleteFolder";
import ModalRenameFolder from "./ModalRenameFolder";
import Button, { ButtonType } from "../../common/Button";
import { IoClose, IoPencil } from "react-icons/io5";
import type { Folder } from "~/services/documents/folder";

type ActionsProps = {
    folder: Folder;
}

export default function Actions({ folder }: ActionsProps) {
    const deleteDialogRef = useRef<HTMLDialogElement>(null);
    const renameDialogRef = useRef<HTMLDialogElement>(null);
    const { id } = folder;

    return (
        <div className="flex justify-end items-center p-2">
            <div className="flex gap-1">
                <Button 
                    type="button" 
                    buttonType={ButtonType.Danger} 
                    aria-label="Delete folder"
                    onClick={() => deleteDialogRef.current?.showModal()}
                >
                    <IoClose />
                </Button>

                <Button 
                    type="button"  
                    buttonType={ButtonType.Primary}  
                    aria-label="Rename folder"
                    onClick={() => renameDialogRef.current?.showModal()}
                >
                    <IoPencil />
                </Button>
            </div>

            <ModalDeleteFolder key={`delete-modal-${id}`} folder={folder} ref={deleteDialogRef} />
            <ModalRenameFolder key={`rename-modal-${id}`} folder={folder} ref={renameDialogRef} />
        </div>
    );
}