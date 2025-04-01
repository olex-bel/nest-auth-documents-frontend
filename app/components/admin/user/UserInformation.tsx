
import type { User } from "~/services/documents/user";

type UserInformationProps = {
    user: User;
};

export default function UserInformation({ user }: UserInformationProps) {
    return (
        <div className="bg-slate-100 rounded p-6 mb-8 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">User Information</h2>
            <div className="flex flex-col gap-2">
                <p>
                    <span className="font-medium">Email:</span> {user.email}
                </p>
                <p>
                    <span className="font-medium">Status:</span>{" "}
                    {user.enabled ? (
                        <span className="text-green-600">Enabled</span>
                    ) : (
                        <span className="text-red-600">Disabled</span>
                    )}
                </p>
            </div>
        </div>
    );
}