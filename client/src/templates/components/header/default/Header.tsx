import React from "react"
import cn from "classnames"
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import s from "./Header.module.scss"
import {getUser} from "../../../../redux/reducer/auth/selectors";
import {TUser} from "../../../../redux/reducer/auth";
import logo from '../../../assets/images/logo_60.png'

export const Header: React.FC = () => {

    const user = useSelector(getUser) as TUser
    return (
        <div className="wrapper">
            <div className="row">
                <header className={cn(s.header)}>
                    <NavLink to='/'>
                        <img className={s.logo} src={logo} alt="crm"/>
                    </NavLink>
                    <div className={s.containerMenu}>
                        <button type="submit" className={s.avatar}>
                            <img src={user.avatarUrl} alt={user.login}/>
                            <nav className={s.userMenu}>
                                <ul>
                                    <li className={s.menuItem}>
                                        <NavLink to="admin/user/settings">settings</NavLink>
                                    </li>
                                    <li className={s.menuItem}>
                                        <NavLink to="logout">logout</NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </button>
                    </div>
                </header>
            </div>
        </div>
    )
}
