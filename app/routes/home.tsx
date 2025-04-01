import { Link } from "react-router";
import type { Route } from "./+types/home";
import Authenticator from "~/services/authenticator";
import { FolderService } from "~/services/documents/folder";
import SearchForm from "~/components/common/SearchForm";
import FoldersTable from "~/components/common/FoldersTable";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Document editor" },
        { name: "description", content: "Welcome to document editor!" },
    ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
    const authenticator = Authenticator.getInstance()
    const searchParams = new URL(request.url).searchParams;
    const cursor = searchParams.get("cursor") as string;
    const query = searchParams.get("query") as string;
    const folderResponse =  await authenticator.authenticatedRequest(FolderService, async (service) => {
        return service.getFolders(10, query, cursor);
    });

    return folderResponse;
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const { items, newCursor } = loaderData;

    return (
        <>
            <div className="flex items-center p-2 gap-2 justify-space-between">
                <SearchForm />
                {
                    newCursor? 
                        <Link to={`/?cursor=${newCursor}`} className="font-bold underline ml-auto">Next &gt;&gt;</Link>
                        : 
                        null
                }
            </div>

            <FoldersTable items={items} />
        </>
    )
}
