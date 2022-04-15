import React from "react";
import {compose} from "redux";
import {withNotAuthRedirect} from "../../../../hoc/AuthRedirect";

const Home = () => {
    return(
        <div>
            Home
        </div>
    )
}

export default compose<React.ComponentType>(
    withNotAuthRedirect,
)(Home)