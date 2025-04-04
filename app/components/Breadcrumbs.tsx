import { useLocation, Link } from "react-router";

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    const crumbs = [{ title: "Home", path: "/"}];

    pathnames.forEach((value, index) => {
        const path = `/${pathnames.slice(0, index + 1).join("/")}`;
        let title = value;

        if (value === "add-document") {
            title = "Add Document";
        } else if (value === "edit") {
            title = "Edit Document";
        } else if (value === "folders") {
            title = "Manage Folders";
        } else if (value === "users") {
            title = "Manage Users";          
        } else if (value.match(/^[a-f0-9-]{36}$/)) {
            title = `${value.slice(0, 8)}...`;
        } else if (value === "documents" || value === "folders" || value === "admin") {
            return;
        }
        
        crumbs.push({ title, path });
    });

    const lastIndex = crumbs.length - 1;

    if (crumbs.length === 0) {
        return null;
    }

    return (
        <ol aria-label="breadcrumb" className="flex justify-start px-2 py-4 gap-1">
            {
                crumbs.map((crumb, index) => (
                    <li key={index}>
                        {
                            index === lastIndex ?
                                <span>{crumb.title}</span> :
                                <Link className="underline after:content-['>']" to={crumb.path}>{crumb.title}</Link>
                        }
                    </li>
                ))
            }
        </ol>
    )
}