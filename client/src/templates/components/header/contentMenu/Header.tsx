import React, {FC} from "react"
import s from "./Header.module.scss"

interface HeaderProps {
    title?: string;
    event?: any;
    children?: React.ReactNode;
}

const Header: FC<HeaderProps> = (props) => {
    return (
        <header className={s.contentHeader}>
            <h1>
                {props.title}
            </h1>
            <nav>
                <svg className={s.contentHeaderIcon} onClick={props.event} viewBox="0 0 32 32">
                    <path
                        d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path>
                </svg>
            </nav>
        </header>
    )
}

export default Header