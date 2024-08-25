import type { RouteObject } from "react-router-dom";
import Page from "./page";
import { LoginForm, RegisterForm } from "./partials";
import AccountVerification from "./account-verification";

export default [
    {
        path: "/auth",
        element: <Page />,
        children: [
            {
                path: "login",
                element: <LoginForm />,
            },
            {
                path: "register",
                element: <RegisterForm />,
            },
        ],
    },
    {
        path: "/auth/verify",
        element: <AccountVerification />,
    }
] as RouteObject[];