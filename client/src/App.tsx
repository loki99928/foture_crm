import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";

import store from "./redux/store";

import "./templates/assets/scss/normalize.scss"
import "./templates/assets/scss/settings.scss"
import {Routers} from "./urlrewrite";
import {Preloader} from "./templates/components/preloader/default/Preloader";
import {actionsApp} from "./redux/reducer/app/actions";
import {getInitialized} from "./redux/reducer/app/selectors";
import {isAuth} from "./redux/reducer/auth/selectors";

const MineApp: React.FC = () => {
    const isInitialized = useSelector(getInitialized)
    const statusAuth = useSelector(isAuth)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actionsApp.initializedRequest())
    }, [statusAuth])

    if (!isInitialized){
        return (
            <Preloader/>
        );
    }
    return (
        <Routers/>
    );

}

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <MineApp/>
            </Provider>
        </BrowserRouter>
    )
}
export default App
