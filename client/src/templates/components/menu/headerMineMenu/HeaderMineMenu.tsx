import React from "react";
import cn from "classnames";

import s from "./HeaderMineMenu.module.scss";
import UserMenu from "../userMenu";
import SettingsMenu from "../settingsMenu";
import AlarmElement from "../../elements/alarm/";
import MessageElement from "../../elements/message";
import SearchForm from "../../forms/SearchForm";
import BurgerMenu from "../burgerMenu";
import {useSelector} from "react-redux";
import {isOpenMobileMenu} from "../../../../redux/reducer/statusDomElement/selectors";

const HeaderMineMenu = () => {

    let statusMenu = useSelector(isOpenMobileMenu)

    return (
        <div className={cn(s.containerMenu, s.container__menu)}>
            <SearchForm/>
            <MessageElement/>
            <AlarmElement/>
            <div className={cn(s.adaptiveMenu, statusMenu ? s.open : '')}>
                <UserMenu/>
                <SettingsMenu/>
            </div>
            <BurgerMenu/>
        </div>
    )
}

export default HeaderMineMenu;