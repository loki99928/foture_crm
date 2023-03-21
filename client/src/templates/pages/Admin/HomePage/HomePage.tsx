import React from "react";
import {Sidebar} from "../../../components/sidebar/default/Sidebar";
import {Header} from "../../../components/header/default/Header";

export const HomePage = () => {
    return (
        <React.Fragment>
            <div className="wrapper container">
                <Header/>
                <div className="row">
                    <Sidebar/>
                    <main className="content">
                        Home
                    </main>
                </div>
            </div>
        </React.Fragment>
    )
}
