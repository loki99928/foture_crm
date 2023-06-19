import {StateType} from "../../store";

export const isOpenMobileMenu = (state: StateType) => {
    return state.statusDom.openMenuMobile
}