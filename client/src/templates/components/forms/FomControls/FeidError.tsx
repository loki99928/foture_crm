import cn from "classnames";
import React from "react";
import s from "./Form.module.scss";

export const FieldError: React.FC<any> = (props: any) => {

    const {message, ...rest} = props

    return (
        <div className={cn(s.formTextError, s.formServer__error)} data-testid="formTextError">
            {message}
        </div>
    )
};