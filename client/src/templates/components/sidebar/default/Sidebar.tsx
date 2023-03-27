import React from "react"
import {Link} from "react-router-dom";

import s from './Sidebar.module.scss'

const Sidebar: React.FC = () => {
    return (
        <aside className={s.sidebar}>
            <div className={s.itemMenu}>
                <Link to={"/"}>Home</Link>
                <Link to={"/User"}>User</Link>
            </div>
        </aside>
    )
}

export default Sidebar