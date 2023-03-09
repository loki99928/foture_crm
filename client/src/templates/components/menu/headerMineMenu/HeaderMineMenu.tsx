import {NavLink} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

import s from "./HeaderMineMenu.module.scss";
import {actionsAuth} from "../../../../redux/reducer/auth/actions";
import {getUser} from "../../../../redux/reducer/auth/selectors";
import {TUser} from "../../../../redux/reducer/auth";

export const HeaderMineMenu = () => {
    const dispatch = useDispatch()
    const user = useSelector(getUser) as TUser
    const userLogout = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(actionsAuth.logoutRequest())
    }

    return (
        <React.Fragment>
            <div className={s.containerMenu}>
                <span className={s.avatar}>
                    <img src={user.avatarUrl} alt={user.login}/>
                    <nav className={s.userMenu}>
                        <ul>
                            <li className={s.menuItem}>
                                <NavLink to="admin/user/settings">settings</NavLink>
                            </li>
                            <li className={s.menuItem}>
                                <NavLink to="#" onClick={userLogout}>Logout</NavLink>
                            </li>
                        </ul>
                    </nav>
                </span>
            </div>
        </React.Fragment>
    )
}