import React, {FC} from "react"
import {Link} from "react-router-dom";

import s from './Sidebar.module.scss'

const Sidebar: FC = () => {
    return (
        <aside className={s.sidebar}>
            <nav className={s.itemsMenu}>
                <Link className={s.itemMenu} to={"/"}>Home</Link>
                <Link className={s.itemMenu} to={"/crm/users"}>Users</Link>
            </nav>
        </aside>
    )
}

export default Sidebar