import React from "react";
import cn from "classnames"

import s from "../Form.module.scss"
import {FormikControlTypeBtn} from "../FormikControl";

const Submit: React.FC<FormikControlTypeBtn> = props => {
    const {label, type, ...rest} = props
    return (
        <div>
            <button className={cn(s.formBtn, s.formBtn_hover, s.formBtn_active, s.formBtn_focus)}
                    type={type}
                    {...rest}>
                {label}
            </button>
        </div>
    )
}

export default Submit