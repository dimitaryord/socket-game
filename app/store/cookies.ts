import {setCookie, getCookie, removeCookie} from 'typescript-cookie'

export type AuthType = {
    username: string,
    token: string
}

export const setAuth = (authData: AuthType) => {
    setCookie('isAuth', JSON.stringify(authData), { secure: true, sameSite: 'strict' })
}

export const getAuth = () => {
    const cookie = getCookie('isAuth')
    if(cookie)
        return JSON.parse(cookie)
    return cookie
}

export const deleteAuth = () => {
    removeCookie('isAuth')
}