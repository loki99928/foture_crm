import React from "react"
import cn from "classnames"
import {useSelector} from "react-redux";

import s from "./Header.module.scss"
import {getUser} from "../../../../redux/reducer/auth/selectors";
import {TUser} from "../../../../redux/reducer/auth";
import {NavLink} from "react-router-dom";

export const Header: React.FC = () => {

    const user = useSelector(getUser) as TUser
    return (
        <header className={s.header}>
            <div className={s.avatar}>
                <img src={user.avatarUrl} alt={user.login}/>
                <menu className={s.userMenu}>
                    <ul>
                        <li>
                            <NavLink to="admin/user/settings">settings</NavLink>
                        </li>
                        <li>
                            <NavLink to="logout">logout</NavLink>
                        </li>
                    </ul>
                </menu>
            </div>
        </header>
    )
}
