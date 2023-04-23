import React, {FC} from "react";
import {NavLink} from "react-router-dom";

import logo from "../../../assets/images/logo.png";
import s from "./Logo.element.module.scss";

const Logo: FC = () => {
    return (
        <React.Fragment>
            <NavLink to='/' className={s.logo}>
                <img className={s.logoImg} src={logo} alt="crm"/>
                <span>EMS</span>
            </NavLink>
        </React.Fragment>
    )
}
export default Logo;