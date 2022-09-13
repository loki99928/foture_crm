import {StateType} from "../../store";

export const getInitialized = (state: StateType) => {
    return state.app.initialized
}
