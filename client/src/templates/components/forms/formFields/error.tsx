import {useSelector} from "react-redux";
import cn from "classnames";
import React from "react";
import {getMessage} from "../../../../redux/reducer/auth/selectors";
import s from "../Form.module.scss";

export const ErrorResponse = () => {
    let message = useSelector(getMessage)

    return(
        <div className={cn(s.formTextError, s.formServer__error)}>
            {message}
        </div>
    )
};