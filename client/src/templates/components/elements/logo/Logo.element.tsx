import React from "react";
import {NavLink} from "react-router-dom";

import logo from "../../../assets/images/logo.png";
import s from "./Logo.element.module.scss";

export const Logo: React.FC = () => {
    return (
        <React.Fragment>
            <NavLink to='/' className={s.logo}>
                <img className={s.logoImg} src={logo} alt="crm"/>
                <span>EMS</span>
            </NavLink>
        </React.Fragment>
    )
}