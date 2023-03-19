import React from "react";
import cn from "classnames";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import s from "../headerMineMenu/HeaderMineMenu.module.scss";
import {getUser} from "../../../../redux/reducer/auth/selectors";
import {TUser} from "../../../../redux/reducer/auth/types";
import {actionsAuth} from "../../../../redux/reducer/auth/actions";

export const UserMenu = () => {

    const dispatch = useDispatch()
    const user = useSelector(getUser) as TUser

    const userLogout = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(actionsAuth.logoutRequest())
    }

    return (
        <React.Fragment>
            <div className={cn('containerMenuSelect')}>
                <span className={cn(s.avatarMenu, s.menu__avatar)}>
                    <img className={s.menuImg} src={user.avatarUrl} alt={user.login}/>
                </span>
                <nav className={cn('menuSelect', s.userMenu)}>
                    <ul>
                        <li className={s.menuItem}>
                            <NavLink to="#" onClick={userLogout}>Logout</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    )
}