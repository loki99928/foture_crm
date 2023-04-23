import React, {FC} from "react";
import cn from "classnames"

import s from "./Preloader.module.scss"

const Preloader: FC = () => {
    return (
        <div className={s.containerLoader}>
            <div className={s.blockLoader}>
                <div className={cn(s.inner, s.inner_one)}></div>
                <div className={cn(s.inner, s.inner_two)}></div>
                <div className={cn(s.inner, s.inner_three)}></div>
            </div>
        </div>
    )
}

export default Preloader