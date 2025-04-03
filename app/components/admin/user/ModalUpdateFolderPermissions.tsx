import Modal from "~/components/common/Modal";
import Button from "~/components/common/Button";
import PermissionSelect from "./PermissionSelect";
import { useModalFetcher } from "~/hooks/useModalFetcher";
import type { Folder } from "~/services/documents/folder";

type ModalUpdateFolderPermissionsProps = {
    folder: Folder;
    ref: React.RefObject<HTMLDialogElement | null>;
}

export default function ModalUpdateFolderPermissions({ ref, folder }: ModalUpdateFolderPermissionsProps) {
    const { fetcher, errorMessage, isSubmitting, reset } = useModalFetcher({ ref });
    const handleClose = () => {
        reset();
        ref.current?.close();
    }

    return (
        <Modal ref={ref}>
            <fetcher.Form method="post">
                <input type="hidden" name="folderId" value={folder.id} />
                <div className="p-4">
                    <PermissionSelect currentPermissionId={folder.permissionId} />
                    {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                    <div className="flex justify-end mt-4">
                        <Button type="submit" disabled={isSubmitting} className="mr-2" name="action" value="update-permissions">
                            {isSubmitting ? "Updating..." : "Update"}
                        </Button>
                        <Button type="button" disabled={isSubmitting} onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </fetcher.Form>
        </Modal>
    )
}