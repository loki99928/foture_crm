import React from "react";
import {NavLink} from "react-router-dom";
import cn from "classnames";

import logo from "../../../assets/images/logo_60.png";
import s from "./Logo.element.module.scss";

export const Logo = () => {
    return (
        <React.Fragment>
            <NavLink to='/' className={s.logo}>
                <img  className={s.logoImg} src={logo} alt="crm"/>
            </NavLink>
        </React.Fragment>
    )
}