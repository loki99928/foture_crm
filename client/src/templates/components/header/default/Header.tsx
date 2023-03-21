import React from "react"
import cn from "classnames"

import s from "./Header.module.scss"
import {HeaderMineMenu} from "../../menu/headerMineMenu/HeaderMineMenu";
import {Logo} from "../../elements/logo/Logo.element";

export const Header: React.FC = () => {
    return (
        <div className="row">
            <header className={cn(s.header)}>
                <Logo/>
                <HeaderMineMenu/>
            </header>
        </div>
    )
}
