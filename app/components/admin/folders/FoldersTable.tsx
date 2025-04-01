import type { Folder } from "~/services/documents/folder"

type ActionsComponentProps = {
    folder: Folder;
};

type FoldersTableProps = {
    items: Folder[];
    actionsComponent?: React.ComponentType<ActionsComponentProps>;
}

export default function FoldersTable({ items, actionsComponent }: FoldersTableProps) {
    const ActionsComponent = actionsComponent ? actionsComponent : null;

    return (
        <>
            <table className="table-autotext-left rtl:text-right text-gray-800 text-lg w-full rounded shadow-sm">
                <thead className="uppercase font-bold bg-slate-200">
                    <tr>
                        <th scope="col" className="px-3 py-1.5 md:px-6 md:py-3">ID</th>
                        <th scope="col" className="px-3 py-1.5 md:px-6 md:py-3 w-3/5">Name</th>
                        {ActionsComponent && <th scope="col" className="px-3 py-1.5 md:px-6 md:py-3">Actions</th>}
                    </tr>
                </thead>

                <tbody className="bg-slate-100">
                    {
                        items.map(folder => (
                            <tr key={folder.id} className="border-b border-slate-200">
                                <td className="px-2 py-1 md:px-4 md:py-2">{folder.id}</td>
                                <td className="px-2 py-1 md:px-4 md:py-2">{folder.name}</td>
                                {ActionsComponent && <td className="px-2 py-1 md:px-4 md:py-2"><ActionsComponent folder={folder} /></td>}
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {items.length === 0 && <div className="text-center text-lg text-gray-500 p-4">No folders found.</div>}
        </>
    )
}