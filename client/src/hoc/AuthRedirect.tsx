import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {StateType} from "../redux/store";
import {isAuth} from "../redux/reducer/auth/selectors";

let mapStateToPropsForRedirect = (state: StateType) => {
    return {
        isAuth: isAuth(state),
    } as RedirectComponentPropsType
}

type RedirectComponentPropsType = {
    isAuth: boolean
}

export function withNotAuthRedirect <WCP>(Component: React.ComponentType<WCP>) {

    let redirectComponent: React.FC<RedirectComponentPropsType> = (props) => {

        let {isAuth, ...restProps} = props

        console.log('withNotAuthRedirect isAuth -> ', isAuth)

        if (!isAuth) {
            return (
                <Navigate to="/auth"></Navigate>
            );
        }
        return <Component {...restProps as WCP}/>
    }

    let connectedRedirectComponent = connect<RedirectComponentPropsType, {}, WCP, StateType>(mapStateToPropsForRedirect)(redirectComponent)

    return connectedRedirectComponent
}

export function withAuthRedirect <WCP>(Component: React.ComponentType<WCP>) {

    let redirectComponent = (props: RedirectComponentPropsType) => {
        let {isAuth, ...restProps} = props

        if (isAuth) {
            return (
                <Navigate to="/"></Navigate>
            );
        }
        return <Component {...restProps as WCP}/>
    }

    let connectedRedirectComponent = connect<RedirectComponentPropsType, {}, WCP, StateType>(mapStateToPropsForRedirect)(redirectComponent)

    return connectedRedirectComponent
}