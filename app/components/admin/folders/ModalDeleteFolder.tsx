import { Form } from "react-router";
import Modal from "~/components/common/Modal";
import Button, { ButtonType } from "~/components/common/Button";
import type { Folder } from "~/services/documents/folder";

type ModalDeleteFolderProps = {
    folder: Folder;
    ref: React.RefObject<HTMLDialogElement | null>;
}

export default function ModalDeleteFolder({ folder, ref }: ModalDeleteFolderProps) {
    const { id } = folder;
    return (
        <Modal ref={ref}>
            <Form method="post">
                <input type="hidden" name="folderId" value={id} />
                <div className="p-4">
                    <p>Are you sure you want to delete this folder {id}?</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button 
                            type="submit" 
                            buttonType={ButtonType.Danger}
                            name="action" 
                            value="delete" 
                        >
                            Delete
                        </Button>
                        <Button 
                            type="button" 
                            buttonType={ButtonType.Primary}
                            onClick={() => ref.current?.close()}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
}