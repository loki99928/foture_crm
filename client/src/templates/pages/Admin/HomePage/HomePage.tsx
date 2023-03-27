import React from "react";
import Sidebar from "../../../components/sidebar/default";
import Header from "../../../components/header/default";

const HomePage = () => {
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

export default HomePage;