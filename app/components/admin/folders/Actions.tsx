import Button, { ButtonType } from "../../common/Button";
import { IoClose, IoPencil } from "react-icons/io5";

type ActionsProps = {
    folderId: string;
}

export default function Actions({ folderId }: ActionsProps) {
    return (
        <div className="flex justify-end items-center p-2">
            <form action={`folders/${folderId}`} method="post">
                <div className="flex gap-1">
                    <Button type="submit" buttonType={ButtonType.Danger} name="action" value="delete" aria-label="Delete folder">
                        <IoClose />
                    </Button>

                    <Button type="submit" buttonType={ButtonType.Primary} name="action" value="rename" aria-label="Rename folder">
                        <IoPencil />
                    </Button>
                </div>
            </form>
        </div>
    );
}