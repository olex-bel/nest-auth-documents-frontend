import { type RouteConfig, index, layout, route, prefix } from "@react-router/dev/routes";

export default [
    layout("./layouts/auth.tsx", [
        route("login", "routes/signin.tsx")
    ]),
    layout("./layouts/app.tsx", [
        index("routes/home.tsx"),

        ...prefix("folders", [
            route(":folderId", "routes/folder.tsx"),
            route(":folderId/documents/:documentId", "routes/document.tsx"),
            route(":folderId/add-document", "routes/add-document.tsx"),
            route(":folderId/documents/:documentId/edit", "routes/edit-document.tsx"),
        ]),

        route("/profile", "routes/profile.tsx"),
        ...prefix("admin", [
            route("/users", "routes/manage-users.tsx"),
            route("/users/:userId", "routes/user.tsx"),
            route("/folders", "routes/manage-folders.tsx"),
        ]),
    ]),
    
] satisfies RouteConfig;
