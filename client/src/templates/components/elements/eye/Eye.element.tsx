import React, {FC, Props} from "react";
import cn from "classnames";
import s from './Eye.element.module.scss'

type TEyeProps = {
    showPassword: boolean
    eventClick: () => void
}

const Eye: FC<TEyeProps> = (props) => {
    const showPassword = props.showPassword
    return (
        <>
            <div className={cn(s.eye, showPassword ? s.eye_open : s.eye_closed)}
                 onClick={props.eventClick}
                 onKeyDown={() => void 0}
                 role="button"
                 tabIndex={0}
                 data-testid='eye'
            ></div>
        </>
    );
}

export default Eye