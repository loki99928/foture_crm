import React from "react"
import cn from "classnames"
import {useSelector} from "react-redux";

import s from "./Header.module.scss"
import {getUser} from "../../../../redux/reducer/auth/selectors";
import {TUser} from "../../../../redux/reducer/auth";

export const Header: React.FC = () => {

    const user = useSelector(getUser) as TUser
    return (
        <header>
            <img src={user.avatarUrl} alt={user.login}/>
            Header
        </header>
    )
}
