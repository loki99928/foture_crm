import React from "react";

import {compose} from "redux";
import {withNotAuthRedirect} from "../../../../hoc/AuthRedirect";
import Home from "../../../components/content/Home/Home";
import User from "../../../components/content/User/User";

const UserPage = () => {
    return (
        <main>
            <User/>
        </main>
    )
}

export default compose(
    withNotAuthRedirect,
)(UserPage)