import React from "react";
import {NavLink} from "react-router-dom";

import s from './Message.module.scss'

type MessageType = {
    message?: string
}

const Message = (props: MessageType) => {
    return (
        <div className={s.containerMessage}>
            <div className={s.blockMessage}>
                <div className={s.blockMessage__text}>
                    {props.message}
                </div>
                <NavLink className={s.linkBack} to={'/'}>Back</NavLink>
            </div>
        </div>
    )
}
export default Message