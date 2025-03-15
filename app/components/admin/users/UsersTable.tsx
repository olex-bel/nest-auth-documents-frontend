import { Link } from "react-router";
import type { User } from "~/services/documents/user";

type UsersTableProps = {
    items: User[];
}

export default function UsersTable({ items }: UsersTableProps) {
    return (
        <>
            <table className="table-autotext-left rtl:text-right text-gray-800 text-lg w-full rounded">
                <thead className="uppercase font-bold bg-slate-200">
                    <tr>
                        <th scope="col" className="px-3 py-1.5 md:px-6 md:py-3">ID</th>
                        <th scope="col" className="px-3 py-1.5 md:px-6 md:py-3 w-3/5">Email</th>
                    </tr>
                </thead>

                <tbody className="bg-slate-100">
                    {
                        items.map(user => (
                            <tr key={user.id} className="border-b border-slate-200">
                                <td className="px-2 py-1 md:px-4 md:py-2">{user.id}</td>
                                <td className="px-2 py-1 md:px-4 md:py-2"><Link to={`/admin/users/${user.id}`}>{user.email}</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {items.length === 0 && <div className="text-center text-lg text-gray-500 p-4">No users found.</div>}
        </>
    )
}