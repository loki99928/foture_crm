import React from "react";
import cn from "classnames";

import s from "./HeaderMineMenu.module.scss";
import {UserMenu} from "../userMenu/UserMenu";
import {SettingsMenu} from "../settingsMenu/SettingsMenu";

export const HeaderMineMenu = () => {

    return (
        <React.Fragment>
            <div className={cn(s.containerMenu, s.container__menu)}>
                <div className="">
                    <svg className={cn('menuSvg')} viewBox="0 0 24 24"><path d="M12 2A2 2 0 0 0 10 4A2 2 0 0 0 10 4.29C7.12 5.14 5 7.82 5 11V17L3 19V20H21V19L19 17V11C19 7.82 16.88 5.14 14 4.29A2 2 0 0 0 14 4A2 2 0 0 0 12 2M12 6A5 5 0 0 1 17 11V18H7V11A5 5 0 0 1 12 6M21 6V13H23V6H21M21 15V17H23V15H21M10 21A2 2 0 0 0 12 23A2 2 0 0 0 14 21H10Z" /></svg>
                </div>
                <UserMenu/>
                <SettingsMenu/>
            </div>
        </React.Fragment>
    )
}