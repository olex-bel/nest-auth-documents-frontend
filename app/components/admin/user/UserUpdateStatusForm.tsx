import { Form } from "react-router";
import Button from "~/components/common/Button";
import type { User } from "~/services/documents/user";

type UserUpdateStatusFormProps = {
    user: User;
};

export default function UserUpdateStatusForm({ user }: UserUpdateStatusFormProps) {
    return (
        <div className="bg-slate-100 shadow-sm rounded p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Update User Status</h2>
            <Form method="POST">
                <div className="flex items-center gap-4">
                    <input type="hidden" name="action" value="update-status" />
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="enabled"
                            defaultChecked={user.enabled}
                            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Enabled</span>
                    </label>
                    <Button type="submit">
                        Update
                    </Button>
                </div>
            </Form>
        </div>
    )
}
