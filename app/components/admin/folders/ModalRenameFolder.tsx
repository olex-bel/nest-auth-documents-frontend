import Modal from "~/components/common/Modal";
import Button, { ButtonType } from "~/components/common/Button";
import Input from "~/components/common/Input";
import { useModalFetcher } from "~/hooks/useModalFetcher";
import type { Folder } from "~/services/documents/folder";

type ModalRenameFolderProps = {
    folder: Folder;
    ref: React.RefObject<HTMLDialogElement | null>;
}

export default function ModalRenameFolder({ folder, ref }: ModalRenameFolderProps) {
    const { fetcher, errorMessage, isSubmitting, reset } = useModalFetcher({ ref });
    const { id, name } = folder;
    const handleCancel = () => {
        ref.current?.close();
        reset();
    }

    return (
        <Modal ref={ref}>
            <fetcher.Form method="post">
                <input type="hidden" name="folderId" value={id} />
                <div className="p-4">
                    <Input 
                        type="text" 
                        name="folderName"
                        aria-label="Search"
                        className="w-full"
                        autoComplete="off"
                        defaultValue={name}
                    />
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                    <div className="flex justify-end gap-2 mt-4">
                        <Button 
                            type="submit" 
                            buttonType={ButtonType.Primary}
                            name="action" 
                            value="rename"
                            disabled={isSubmitting} 
                        >
                            Rename
                        </Button>
                        <Button 
                            type="button" 
                            buttonType={ButtonType.Primary}
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </fetcher.Form>
        </Modal>
    );
}