import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Avatar.module.scss";
import logo from "../../assets/images/logo_60.png";
import cn from "classnames";

export const Logo = () => {
    return (
        <React.Fragment>
            <NavLink to='/' className={s.logo}>
                <img  className={s.logoImg} src={logo} alt="crm"/>
            </NavLink>
        </React.Fragment>
    )
}