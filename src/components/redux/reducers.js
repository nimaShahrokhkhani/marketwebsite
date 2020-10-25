import { SET_USER } from "./actions";

function userDataReducer(state={users: []}, action){
    switch(action.type) {
        case SET_USER:
            return Object.assign({}, state,
                {
                    user: action.user
                });
        default:
            return state;
    }
}

export default userDataReducer;
