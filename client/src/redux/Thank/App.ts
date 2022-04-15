import {getUser} from "./Auth";
import {BaseThunkType} from "../store";
import {actions, ActionTypeApp} from "../Actions/App";

/**
 * authorization user
 *
 * @returns {(function(*): void)|*}
 */
export const initializeApp = (): ThunkType => (dispatch) => {

    let arrayPromise: Array<Promise<any>> = []

    arrayPromise.push(dispatch(getUser()))

    return Promise.all(arrayPromise)
        .then(() => {
            dispatch(actions.toggleInitialized())
        })

}
type ThunkType = BaseThunkType<ActionTypeApp>
