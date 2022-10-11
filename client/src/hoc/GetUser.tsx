import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {StateType} from "../redux/store";
// import {getAccessToken, isAuth} from "../redux/Selectors/usersSelectors";

let mapStateToPropsForGetUser = (state: StateType) => {
    return {
        // accessToken: getAccessToken(state),
    } as GetUserComponentPropsType
}

type GetUserComponentPropsType = {
    accessToken: string
}

export function getUser <WCP>(Component: React.ComponentType<WCP>) {

    let userComponent: React.FC<GetUserComponentPropsType> = (props) => {

        let {accessToken, ...restProps} = props

        return <Component {...restProps as WCP}/>
    }

    let connectedRedirectComponent = connect<GetUserComponentPropsType, {}, WCP, StateType>(mapStateToPropsForGetUser)(userComponent)

    return connectedRedirectComponent
}
