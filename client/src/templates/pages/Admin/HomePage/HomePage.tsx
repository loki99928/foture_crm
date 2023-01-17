import React from "react";

import {compose} from "redux";
import {withNotAuthRedirect} from "../../../../hoc/AuthRedirect";

const HomePage = () => {
    return (
        <main>
            Home
        </main>
    )
}

export default compose<React.ComponentType>(
    withNotAuthRedirect,
)(HomePage)