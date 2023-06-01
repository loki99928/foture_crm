import React, {FC} from "react";
import Sidebar from "../../../components/sidebar/default";
import Header from "../../../components/header/default";
import Watermark from "../../../components/main/Watermak";
import PopupWatermark from "../../../components/popup/watermark";


const WatermarkPage: FC = () => {
    return (
        <>
            <div className="wrapper container">
                <Header/>
                <div className="row">
                    <Sidebar/>
                    <main className="content">
                        <Watermark/>
                    </main>
                </div>
                <PopupWatermark title="Add Watermark"/>
            </div>
        </>
    )
}
export default WatermarkPage