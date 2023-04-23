import cn from "classnames";
import React, {FC} from "react";
import s from "../util/Form.module.scss";

export const FieldError: FC<any> = (props: any) => {

    const {message} = props

    return (
        <div className={cn(s.formTextError, s.formServer__error)} data-testid="formTextError">
            {message}
        </div>
    )
};