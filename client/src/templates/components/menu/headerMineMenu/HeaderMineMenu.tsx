import React from "react";
import cn from "classnames";

import s from "./HeaderMineMenu.module.scss";
import UserMenu from "../userMenu";
import SettingsMenu from "../settingsMenu";
import AlarmElement from "../../elements/alarm/";
import MessageElement from "../../elements/message";
import SearchForm from "../../forms/SearchForm";

const HeaderMineMenu = () => {

    return (
        <React.Fragment>
            <div className={cn(s.containerMenu, s.container__menu)}>
                <SearchForm/>
                <MessageElement/>
                <AlarmElement/>
                <UserMenu/>
                <SettingsMenu/>
            </div>
        </React.Fragment>
    )
}

export default HeaderMineMenu;