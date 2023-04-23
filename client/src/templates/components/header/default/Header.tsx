import React, {FC} from "react"
import cn from "classnames"

import s from "./Header.module.scss"
import HeaderMineMenu from "../../menu/headerMineMenu";
import Logo from "../../elements/logo";

const Header: FC = () => {
    return (
        <div className="row">
            <header className={cn(s.header)}>
                <Logo/>
                <HeaderMineMenu/>
            </header>
        </div>
    )
}

export default Header