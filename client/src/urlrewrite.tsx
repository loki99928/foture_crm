import React from "react";
import {Route, Routes} from "react-router-dom";
import {Navigate} from "react-router";

import HomePage from "./templates/pages/Admin/HomePage";
import AuthPage from "./templates/pages/Client/Auth/AuthPage";
import RegisterPage from "./templates/pages/Client/Auth/RegisterPage";
import MessagePage from "./templates/pages/Client/MessagePage";
import ForgetPasswordPage from "./templates/pages/Client/Auth/ForgetFormPage";
import UserConfirmationPage from "./templates/pages/Client/Auth/UserConfirmationPage";
import UserSettingPage from "./templates/pages/Admin/UserSettingPage";
import NewPasswordPage from "./templates/pages/Client/Auth/NewPasswordPage";

export interface IRoute {
    id: string
    path: string
    element: React.ReactElement<any, any>
}

export const publicRouters: IRoute[] = [
    {
        id: 'AUTH',
        path: '/auth',
        element: <AuthPage/>
    },
    {
        id: 'REGISTRATION',
        path: '/registration',
        element: <RegisterPage/>
    },
    {
        id: 'FORGET',
        path: '/forget',
        element: <ForgetPasswordPage/>
    },
    {
        id: 'CONFIRM',
        path: '/confirm/:hashUser',
        element: <UserConfirmationPage/>
    },
    {
        id: 'NEW_PASSWORD',
        path: '/new_password/:hashUser',
        element: <NewPasswordPage/>
    },
    {
        id: 'MESSAGE',
        path: '/message',
        element: <MessagePage/>
    },
    {
        id: 'ERROR',
        path: '*',
        element: <Navigate to="/auth" replace/>
    },
]

export const privatesRouters: IRoute[] = [
    {
        id: 'USER',
        path: '/crm',
        element: <HomePage/>
    },
    {
        id: 'USER',
        path: '/crm/user',
        element: <UserSettingPage/>
    },
    {
        id: 'ERROR',
        path: '*',
        element: <Navigate to="/crm" replace/>
    },
]

export const Routers = (props: { routers: IRoute[]; }) => {
    return (
        <Routes>
            {
                props.routers.map(r => {
                    const {id, ...props} = r
                    return <Route key={id} {...props}/>
                })
            }
        </Routes>
    );
}
