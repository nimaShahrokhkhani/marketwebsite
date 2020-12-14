export const SET_STATE = 'SET_STATE'; // action types
export const SET_USER = 'SET_USER'; // action types
export const ADD_PRODUCT = 'ADD_PRODUCT'; // action types
export const DELETE_PRODUCT = 'DELETE_PRODUCT'; // action types
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS'; // action types
export const DECREASE_PRODUCT = 'DECREASE_PRODUCT'; // action types
export const INCREASE_PRODUCT = 'INCREASE_PRODUCT'; // action types

export function setState(state) {
    return({
        type: SET_STATE,
            state     // action payload
    })
}

export function setUser(user) {
    return({
        type: SET_USER,
            user     // action payload
    })
}

export function addProduct(product) {
    return({
        type: ADD_PRODUCT,
            product     // action payload
    })
}

export function deleteAllProducts() {
    return({
        type: DELETE_PRODUCTS
        // action payload
    })
}

export function deleteProduct(product) {
    return({
        type: DELETE_PRODUCT,
            product     // action payload
    })
}

export function decreaseProduct(product) {
    return({
        type: DECREASE_PRODUCT,
            product     // action payload
    })
}

export function increaseProduct(product) {
    return({
        type: INCREASE_PRODUCT,
            product     // action payload
    })
}
