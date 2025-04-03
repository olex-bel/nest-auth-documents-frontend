import { useFetcher } from "react-router";
import Button, { ButtonType } from "~/components/common/Button";
import PermissionSelect from "./PermissionSelect";
import { IoAdd } from "react-icons/io5";
import type { Folder } from "~/services/documents/folder";

type UnassignedFolderActionsProps = {
    folder: Folder;
}

export default function UnassignedFolderActions({ folder }: UnassignedFolderActionsProps) {
    const fetcher = useFetcher();
    const { id } = folder;

    return (
        <div className="flex justify-end items-center p-2">
            <fetcher.Form method="post">
                <div className="flex gap-1 items-end">
                
                    <input type="hidden" name="folderId" value={id} />
                    <PermissionSelect />
                    <Button 
                        type="submit" 
                        buttonType={ButtonType.Danger} 
                        aria-label="Assign folder"
                        name="action"
                        value="assign-folder"
                    >
                        <IoAdd />
                    </Button>
                </div>
            </fetcher.Form>
        </div>
    )
}