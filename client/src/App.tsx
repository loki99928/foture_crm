import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";

import store from "./redux/store";

import "./templates/assets/scss/Normalize.css"
import "./templates/assets/scss/Settings.scss"

import {AuthPage} from "./templates/pages/AuthPage/AuthPage";
import {RegisterPage} from "./templates/pages/RegisterPage/RegisterPage";
import {ForgetPasswordPage} from "./templates/pages/ForgetFormPage/ForgetPasswordPage";
import {HomePage} from "./templates/pages/HomePage/HomePage";
import MessagePageContainer from "./templates/pages/MessagePage/MessagePageContainer";
import UserConfirmationPage from "./templates/pages/UserConfirmationPage/UserConfirmationPage";
import {NewPasswordPage} from "./templates/pages/NewPasswordPage/NewPasswordPage";
import {ErrorPage} from "./templates/pages/ErrorPage/ErrorPage";

const MineApp = () => {
    return (
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/auth" element={<AuthPage/>}/>
                <Route path="/registration" element={<RegisterPage/>}/>
                <Route path="/message" element={<MessagePageContainer/>}/>
                <Route path="/forget" element={<ForgetPasswordPage/>}/>
                <Route path="/confirm/:userId" element={<UserConfirmationPage/>} />
                <Route path="/new_password/:token" element={<NewPasswordPage/>} />
                <Route path='*' element={<ErrorPage />}/>
            </Routes>
    );
}

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <MineApp/>
            </Provider>
        </BrowserRouter>
    )
}
export default App
