import { useRoles } from "~/hooks/useRoles";
import Button from "../../common/Button";

export default function CreateFolderButton() {
    const roles = useRoles();
    const canCreateFolder = roles.includes('admin');

    return (
        <Button disabled={!canCreateFolder}>
            Create folder
        </Button>
    );
}
