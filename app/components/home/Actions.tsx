import Button, { ButtonType } from "../common/Button";
import { Permission } from "~/services/documents/user";
import { IoClose } from "react-icons/io5";

type ActionsProps = {
    folderId: string;
    permissionId: Permission;
}

export default function Actions({ folderId, permissionId }: ActionsProps) {
    const canDelete = permissionId === Permission.SUPERVISE;

    return (
        <div className="flex justify-end items-center p-2">
            {canDelete &&
                <form action={`folders/${folderId}`} method="post">
                    <Button type="submit" buttonType={ButtonType.Danger} name="action" value="delete" aria-label="Delete document">
                        <IoClose />
                    </Button>
                </form>
            }
        </div>
    );
}