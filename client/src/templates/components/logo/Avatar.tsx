import React from "react";
import s from "../header/default/Header.module.scss";
import logo from "../../assets/images/logo_60.png";
import {NavLink} from "react-router-dom";

export const Logo = () => {
    return (
        <React.Fragment>
            <NavLink to='/'>
                <img className={s.logo} src={logo} alt="crm"/>
            </NavLink>
        </React.Fragment>
    )
}