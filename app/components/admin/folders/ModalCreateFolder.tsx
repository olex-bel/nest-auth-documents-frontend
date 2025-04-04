import Modal from "~/components/common/Modal";
import Button, { ButtonType } from "~/components/common/Button";
import Input from "~/components/common/Input";
import { useModalFetcher } from "~/hooks/useModalFetcher";

type ModalCreateFolderProps = {
    ref: React.RefObject<HTMLDialogElement | null>;
}

export default function ModalCreateFolder({ ref }: ModalCreateFolderProps) {
    const { fetcher, errorMessage, isSubmitting, reset } = useModalFetcher({ ref });
    const handleCancel = () => {
        ref.current?.close();
        reset();
    }
    
    return (
        <Modal ref={ref}>
            <fetcher.Form method="post">
                <div className="p-4">
                    <Input 
                        type="text" 
                        name="folderName"
                        aria-label="Folder Name"
                        placeholder="Enter folder name"
                        className="w-full"
                        autoComplete="off"
                        defaultValue=""
                    />
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                    <div className="flex justify-end gap-2 mt-4">
                        <Button 
                            type="submit" 
                            buttonType={ButtonType.Primary}
                            name="action" 
                            value="create"
                            disabled={isSubmitting} 
                        >
                            Create
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
