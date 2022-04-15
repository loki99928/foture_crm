import React from "react";
import cn from "classnames"

import s from "./Preloader.module.scss"

export const Preloader: React.FC = () => {
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