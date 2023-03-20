import React from "react";
import s from "./Message.element.module.scss";
import cn from "classnames";

export const MessageElement = () => {
    return (
        <React.Fragment>
            <div className="">
                <svg className={cn(s.menuSvg, s.messageIcon)} fill="none" stroke-width="1.5" viewBox="0 0 24 24">
                    <path d="M7 12L17 12" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 8L13 8" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M3 20.2895V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H7.96125C7.35368 17 6.77906 17.2762 6.39951 17.7506L4.06852 20.6643C3.71421 21.1072 3 20.8567 3 20.2895Z"
                        stroke-width="1.5"/>
                </svg>
            </div>
        </React.Fragment>
    )
}