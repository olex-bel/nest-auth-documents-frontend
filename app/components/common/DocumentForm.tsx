
import { Form, useFetcher } from "react-router";
import Button from "~/components/common/Button";
import Input from "~/components/common/Input";

type DocumentFormProps = {
    title?: string;
    content?: string;
    previousChecksum?: string;
    errorMessage?: string;
    onCancel: () => void;
}

export default function DocumentForm({ title, content, previousChecksum, errorMessage, onCancel }: DocumentFormProps) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state !== "idle";

    return (
        <div className="flex flex-col gap-2 h-full">
            <Form method="POST">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Title</label>
                    <Input name="title" id="title" required defaultValue={title} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="content">Content</label>
                    <textarea name="content" id="content" className="border rounded p-2" required defaultValue={content} />
                </div>
                

                { previousChecksum && <input type="hidden" name="previousChecksum" value={previousChecksum} />}

                <div className="flex gap-2 mt-4 justify-end">
                    <Button type="submit" disabled={isSubmitting}>{previousChecksum? "Update" : "Create"}</Button>
                    <Button type="button" disabled={isSubmitting} onClick={onCancel}>Cancel</Button>
                </div>
            </Form>
        </div>
    );
}