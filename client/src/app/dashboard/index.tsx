import type { RouteObject } from "react-router-dom";
import DashboardPage from "./page";
import { CreateNewPost } from "./partials";

export default [
    {
        path: "/dashboard",
        element: <DashboardPage />,
        children: [
            {
                path: "new",
                element: <CreateNewPost />,
            },
        ],
    },
] as RouteObject[];