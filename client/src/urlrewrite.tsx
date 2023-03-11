import React from "react";
import {Route, Routes} from "react-router-dom";

import {HomePage} from "./templates/pages/Admin/HomePage/HomePage";
import {AuthPage} from "./templates/pages/Client/Auth/AuthPage/AuthPage";
import {RegisterPage} from "./templates/pages/Client/Auth/RegisterPage/RegisterPage";
import {MessagePageContainer} from "./templates/pages/Client/MessagePage/MessagePageContainer";
import {ForgetPasswordPage} from "./templates/pages/Client/Auth/ForgetFormPage/ForgetPasswordPage";
import {UserConfirmationPage} from "./templates/pages/Client/Auth/UserConfirmationPage/UserConfirmationPage";
import {ErrorPage} from "./templates/pages/Client/ErrorPage/ErrorPage";
import {UserPage} from "./templates/pages/Admin/UserPage/UserPage";
import {NewPasswordPage} from "./templates/pages/Client/Auth/NewPasswordPage/NewPasswordPage";

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
        element: <MessagePageContainer/>
    },
    {
        id: 'ERROR',
        path: '*',
        element: <AuthPage/>
    },
]

export const privatesRouters: IRoute[] = [
    {
        id: 'USER',
        path: '/crm/',
        element: <HomePage/>
    },
    {
        id: 'USER',
        path: '/crm/user/',
        element: <UserPage/>
    },
    {
        id: 'ERROR',
        path: '*',
        element: <ErrorPage/>
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
