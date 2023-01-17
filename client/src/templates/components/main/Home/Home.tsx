import React from "react";
import {NavLink} from "react-router-dom";

const Home = () => {
    return(
        <div>
            <h1>
                Home
            </h1>
            <p>
                <NavLink to="/user/">User</NavLink>
            </p>
        </div>
    )
}

export default Home
