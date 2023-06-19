import {StatusDomElement} from "./types";

export const actionStatusDomElement = {

    openMobileMenu: (status: boolean) => ({
        type: StatusDomElement.OPEN_MOBILE_MENU,
        payload: {status}
    } as const)

}