import React, {FC} from "react";
import cn from "classnames";
import s from "../util/Form.module.scss";

export const Button: FC<any> = props => {
    const {disabled, ...rest} = props
    return (
        <div>
            <button className={cn(s.formBtn, s.formBtn_hover, s.formBtn_active, s.formBtn_focus)}
                    disabled={disabled}
                    type="submit"
                    {...rest}
            >
                Send
            </button>
        </div>
    )
}