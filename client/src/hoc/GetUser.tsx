import React from "react";
import {connect} from "react-redux";
import {StateType} from "../redux/store";

type GetUserComponentPropsType = {
    accessToken: string
}

export function getUser <WCP>(Component: React.ComponentType<WCP>) {

    let userComponent: React.FC<GetUserComponentPropsType> = (props) => {

        let {accessToken, ...restProps} = props

        return <Component {...restProps as WCP}/>
    }

    return connect<GetUserComponentPropsType, {}, WCP, StateType>(null)(userComponent)
}
