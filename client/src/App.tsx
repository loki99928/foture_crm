import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";

import store from "./redux/store";

import {privatesRouters, publicRouters, Routers} from "./urlrewrite";
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

    if (!isInitialized) {
        return (
            <Preloader/>
        );
    }

    const routers = statusAuth ?  privatesRouters : publicRouters
    return (
        <Routers routers={routers}/>
    );

}

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <MineApp/>
            </BrowserRouter>
        </Provider>
    )
}
export default App
