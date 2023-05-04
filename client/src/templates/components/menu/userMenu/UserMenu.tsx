import React from "react";
import cn from "classnames";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import s from "./UserMenu.module.scss";
import {getUser} from "../../../../redux/reducer/auth/selectors";
import {actionsAuth} from "../../../../redux/reducer/auth/actions";
import {TUser} from "../../../../redux/reducer/user/types";

const UserMenu = () => {

    const dispatch = useDispatch()
    const user = useSelector(getUser) as TUser

    const userLogout = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(actionsAuth.logoutRequest())
    }

    return (
        <React.Fragment>
            <div className={cn('containerMenuSelect', s.menu__user)}>
                <span className={cn(s.avatarMenu)}>
                    <img className={s.menuImg} src={user.avatarUrl} alt={user.login}/>
                </span>
                <nav className={cn('menuSelect', s.userMenu)}>
                    <ul>
                        <li className={'menuItem'}>
                            <NavLink to="/crm/user">Settings user</NavLink>
                        </li>
                        <li className={'menuItem'}>
                            <NavLink to="#" onClick={userLogout}>Logout</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default UserMenu