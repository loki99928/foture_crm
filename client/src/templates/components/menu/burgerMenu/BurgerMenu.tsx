import s from './BurgerMenu.module.scss'
import cn from "classnames";

const BurgerMenu = () => {
    return (
        <svg className={cn(s.ham, s.hamRotate, s.ham4)} viewBox="0 0 100 100" width="40">
            <path
                className={cn(s.line, s.top)}
                d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"/>
            <path
                className={cn(s.line, s.middle)}
                d="m 70,50 h -40"/>
            <path
                className={cn(s.line, s.bottom)}
                d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"/>
        </svg>
    )
}

export default BurgerMenu