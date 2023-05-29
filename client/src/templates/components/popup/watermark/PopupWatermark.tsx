import s from './PopupWatermark.module.scss'
import React, {FC} from "react";

type TWatermarkPopup = {
    title: string
    children?: React.ReactChildren
}
const PopupWatermark: FC<TWatermarkPopup> = (props) => {
    return (
        <>
            <div className={s.containerPopup}>
                <div className={s.blockPopup}>
                    <div className={s.boxPopup}>
                        <div className={s.popupTitle}>{props.title}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopupWatermark