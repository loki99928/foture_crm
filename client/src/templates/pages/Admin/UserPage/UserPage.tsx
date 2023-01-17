import React from "react";

import {compose} from "redux";
import {withNotAuthRedirect} from "../../../../hoc/AuthRedirect";

const UserPage = () => {
    return (
        <main>
            User
        </main>
    )
}

export default compose(
    withNotAuthRedirect,
)(UserPage)