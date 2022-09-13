import React from "react";

import {compose} from "redux";
import {withNotAuthRedirect} from "../../../../hoc/AuthRedirect";
import Home from "../../../components/content/Home/Home";

const HomePage = () => {
    console.log('HomePage')
    return (
        <main>
            <Home/>
        </main>
    )
}

export default compose<React.ComponentType>(
    withNotAuthRedirect,
)(HomePage)