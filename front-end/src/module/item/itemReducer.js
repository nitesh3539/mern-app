import uuid from 'uuid'

let intialState = {
    items : [],
    loading : false
};

export default function itemReducer(state = intialState, action){
    switch(action.type){
        case 'IS_LOADING' : return { ...state, loading : action.payload}
        case 'GET_ITEMS' : 
        return { ...state, loading : false, items : action.payload }
        case 'DELETE_ITEM' : 
        console.log("action",action, state.items)
        return { ...state,loading : false, items : state.items.filter(item => item._id != action.payload  )}
        case 'SET_ITEM' : return {...state, items : [...state.items, action.payload]}
        default: return intialState;
    }

}