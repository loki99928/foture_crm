import React from "react";
import cn from "classnames";

import s from "./HeaderMineMenu.module.scss";
import {UserMenu} from "../userMenu/UserMenu";
import {SettingsMenu} from "../settingsMenu/SettingsMenu";
import {AlarmElement} from "../../elements/alarm/Alarm.element";
import {MessageElement} from "../../elements/message/Message.element";
import {SearchForm} from "../../forms/SearchForm/SearchForm";

export const HeaderMineMenu = () => {

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