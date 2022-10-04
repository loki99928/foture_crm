import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./templates/pages/Admin/HomePage/HomePage";
import AuthPage from "./templates/pages/Auth/AuthPage/AuthPage";
import RegisterPage from "./templates/pages/Auth/RegisterPage/RegisterPage";
import MessagePageContainer from "./templates/pages/Client/MessagePage/MessagePageContainer";
import ForgetPasswordPage from "./templates/pages/Auth/ForgetFormPage/ForgetPasswordPage";
import UserConfirmationPage from "./templates/pages/Auth/UserConfirmationPage/UserConfirmationPage";
import {ErrorPage} from "./templates/pages/Client/ErrorPage/ErrorPage";
import UserPage from "./templates/pages/Admin/UserPage/UserPage";
import {NewPasswordPage} from "./templates/pages/Auth/NewPasswordPage/NewPasswordPage";

const routers = [
    {
        id: 'HOME',
        path: '/',
        element: <HomePage/>
    },
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
        id: 'MESSAGE',
        path: '/message',
        element: <MessagePageContainer/>
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
        id: 'USER',
        path: '/user/',
        element: <UserPage/>
    },
    {
        id: 'ERROR',
        path: '*',
        element: <ErrorPage/>
    },
]

export const Routers = () => {
    return (
        <Routes>
            {
                routers.map(r => {
                    const {id, ...props} = r
                    return <Route key={r.id} {...props}/>
                })
            }
        </Routes>
    );
}
