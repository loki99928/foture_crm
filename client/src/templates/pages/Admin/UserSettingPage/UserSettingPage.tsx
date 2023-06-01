import React from "react";

import Header from "../../../components/header/default";
import Sidebar from "../../../components/sidebar/default";
import UserSetting from "../../../components/forms/UserSetting";

const UserSettingPage = () => {
    return (
        <>
            <div className="wrapper container">
                <Header/>
                <div className="row">
                    <Sidebar/>
                    <main className="content">
                        <UserSetting/>
                    </main>
                </div>
            </div>
        </>
    )
}

export default UserSettingPage;