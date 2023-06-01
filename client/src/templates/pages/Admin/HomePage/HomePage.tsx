import React from "react";
import Sidebar from "../../../components/sidebar/default";
import Header from "../../../components/header/default";

const HomePage = () => {
    return (
        <>
            <div className="wrapper container">
                <Header/>
                <div className="row">
                    <Sidebar/>
                    <main className="content">
                        Home
                    </main>
                </div>
            </div>
        </>
    )
}

export default HomePage;