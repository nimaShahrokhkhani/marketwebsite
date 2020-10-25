export const SET_USER = 'SET_USER' // action types

export function setUser(user) {
    return({
        type: SET_USER,
            user     // action payload
    })
}
