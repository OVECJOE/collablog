import type { RouteObject } from "react-router-dom"
import HomePage, { NotFound } from "./app"
import auth from "./app/auth"
import dashboard from "./app/dashboard"

const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFound />,
    },
    ...auth,
    ...dashboard,
]

export default routes