import Modal from "~/components/common/Modal";
import Button, { ButtonType } from "~/components/common/Button";
import { useModalFetcher } from "~/hooks/useModalFetcher";
import type { Folder } from "~/services/documents/folder";
import { Permission } from "~/services/documents/user";

type ModalUpdateFolderPermissionsProps = {
    folder: Folder;
    ref: React.RefObject<HTMLDialogElement | null>;
}

function enumToOptions<T extends Record<string, string | number>>(enumObj: T) {
    const values = Object.values(enumObj).filter(value => {
        const numberValue = Number(value);
        return !isNaN(numberValue) && numberValue >= 0;
    });
    
    return values.map((value) => ({
        value: value.toString(),
        label: enumObj[value as keyof T] as string,
    }))
}

export default function ModalUpdateFolderPermissions({ ref, folder }: ModalUpdateFolderPermissionsProps) {
    const { fetcher, errorMessage, isSubmitting, reset } = useModalFetcher({ ref });
    const options = enumToOptions(Permission);
    const handleClose = () => {
        reset();
        ref.current?.close();
    }

    return (
        <Modal ref={ref}>
            <fetcher.Form method="post">
                <input type="hidden" name="folderId" value={folder.id} />
                <div className="p-4">
                    <label className="block mb-2 text-sm font-medium">
                        Permission
                        <select defaultValue={folder.permissionId} name="permissionId" className="block w-full p-2 border border-gray-300 rounded-md">
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
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