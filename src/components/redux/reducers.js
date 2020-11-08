import {SET_STATE, SET_USER, ADD_PRODUCT, DELETE_PRODUCT, DECREASE_PRODUCT, INCREASE_PRODUCT} from "./actions";

function saveState(state) {
    console.log('set localstorage:', JSON.parse(localStorage.getItem('state')), state);
    localStorage.setItem('state', JSON.stringify({products: state.products, user: state.user}));
}

function dataReducer(state = {user: {}, products: []}, action) {
    console.log('localstorage state:', JSON.parse(localStorage.getItem('state')), action);
    let result = {};
    switch (action.type) {
        case SET_STATE:
            return {
                user: (action.state && action.state.user) ? action.state.user : (state.user ? state.user : {}),
                products: (action.state && action.state.products) ? action.state.products : (state.products ? state.products : [])
            };
        case SET_USER:
            result = {
                ...state,
                user: action.user
            };
            saveState(result);
            return result;
        case ADD_PRODUCT:
            let productInStateAdd = (state.products && state.products.length > 0) ? state.products.filter(product => product.value.serialNumber === action.product.serialNumber) : [];
            result =(productInStateAdd && productInStateAdd.length > 0) ?
                {
                    ...state,
                    products: state.products.map((item) => (
                        item.value.serialNumber === action.product.serialNumber ? {...item, count: ++item.count} : item
                    ))
                }
                :
                {
                    ...state,
                    products: [...state.products, {value: action.product, count: 1}]
                };
            saveState(result);
            return result;
        case DELETE_PRODUCT:
            result = {
                ...state,
                products: state.products.filter(item => item.value.serialNumber !== action.product.serialNumber)
            };
            saveState(result);
            return result;
        case DECREASE_PRODUCT:
            let productInStateDecrease = (state.products && state.products.length > 0) ? state.products.filter(product => product.value.serialNumber === action.product.serialNumber) : [];
            result = (productInStateDecrease && productInStateDecrease.length > 0 && productInStateDecrease[0].count > 1) ?
                {
                    ...state,
                    products: state.products.map((item) => (
                        item.value.serialNumber === action.product.serialNumber ? {...item, count: --item.count} : item
                    ))
                }
                :
                {
                    ...state,
                    products: state.products.filter(item => item.value.serialNumber !== action.product.serialNumber)
                };
            saveState(result);
            return result;
        case INCREASE_PRODUCT:
            result = {
                ...state,
                products: state.products.map((item) => (
                    item.value.serialNumber === action.product.serialNumber ? {...item, count: ++item.count} : item
                ))
            };
            saveState(result);
            return result;
        default:
            return state;
    }
}

export default dataReducer;
