import Cookies from "js-cookie";

interface SettingsType {
    path: string
    sameSite: 'Strict'
    expires?: number
}
/**
 * set user static token to cookie
 *
 * @param jwt string token user
 * @param remember boolean cookie token save status
 */
export const setCookieJWT = (jwt: string, remember: boolean) => {
    const settings: SettingsType = {path: '/', sameSite: 'Strict'}
    if (remember) {
        settings['expires'] = 1
    }
    Cookies.set('token', jwt, settings);
}
