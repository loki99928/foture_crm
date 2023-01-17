import React from "react";

import {compose} from "redux";
import {withNotAuthRedirect} from "../../../../hoc/AuthRedirect";
import {Sidebar} from "../../../components/sidebar/default/Sidebar";
import {Header} from "../../../components/header/default/Header";

const HomePage = () => {
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

export default compose<React.ComponentType>(
    withNotAuthRedirect,
)(HomePage)