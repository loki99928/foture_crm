import React from "react";
import {Sidebar} from "../../../components/sidebar/default/Sidebar";
import {Header} from "../../../components/header/default/Header";

export const HomePage = () => {
    return (
        <React.Fragment>
            <Header/>
            <div className="content">
                <Sidebar/>
                <main>
                    Home
                </main>
            </div>
        </React.Fragment>
    )
}
