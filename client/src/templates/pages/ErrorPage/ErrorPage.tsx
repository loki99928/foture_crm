import React from "react";
import {NavLink} from "react-router-dom";

import sp from "./ErrorPage.module.scss";

export const ErrorPage = () => {
    window.history.pushState("not found", "Title", "/404");
    return (
        <main>
            <div className={sp.containerNotfound}>
                <div className={sp.notfound}>
                    <div className={sp.notfound_404}>
                        <h1>:(</h1>
                    </div>
                    <h2>404 - Page not found</h2>
                    <p>The page you are looking for might have been removed had its name changed or is temporarily
                        unavailable.</p>
                    <NavLink to="/">home page</NavLink>
                </div>
            </div>
        </main>
    )
}
