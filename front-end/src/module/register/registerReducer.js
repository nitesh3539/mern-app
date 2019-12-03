import uuid from 'uuid'

let intialState = {
    isAuthenticated : false,
    loading : false
};

export default function itemReducer(state = intialState, action){
    switch(action.type){
        case 'IS_LOADING' : return { ...state, loading : action.payload}
        case 'REGISTER_USER' : 
        return { ...state, loading : false, isAuthenticated : action.payload }
        default: return intialState;
    }

}