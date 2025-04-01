import { useRef } from "react";
import ModalRevokeFolderPermissions from "./ModalRevokeFolderPermissions";
import ModalUpdateFolderPermissions from "./ModalUpdateFolderPermissions";
import Button, { ButtonType } from "../../common/Button";
import { IoClose, IoPerson } from "react-icons/io5";
import type { Folder } from "~/services/documents/folder";

type ActionsProps = {
    folder: Folder;
}

export default function Actions({ folder }: ActionsProps) {
    const revokeDialogRef = useRef<HTMLDialogElement>(null);
    const updateDialogRef = useRef<HTMLDialogElement>(null);
    const { id } = folder;

    return (
        <div className="flex justify-end items-center p-2">
            <div className="flex gap-1">
                <Button 
                    type="button" 
                    buttonType={ButtonType.Danger} 
                    aria-label="Delete folder"
                    onClick={() => revokeDialogRef.current?.showModal()}
                >
                    <IoClose />
                </Button>

                <Button 
                    type="button"  
                    buttonType={ButtonType.Primary}  
                    aria-label="Rename folder"
                    onClick={() => updateDialogRef.current?.showModal()}
                >
                    <IoPerson />
                </Button>
            </div>

            <ModalRevokeFolderPermissions key={`revoke-modal-${id}`} folder={folder} ref={revokeDialogRef} />
            <ModalUpdateFolderPermissions key={`rename-modal-${id}`} folder={folder} ref={updateDialogRef} />
        </div>
    );
}