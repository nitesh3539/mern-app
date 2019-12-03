import uuid from 'uuid'

let intialState = {
    isAuthenticated : false,
    loading : false
};

export default function itemReducer(state = intialState, action){
    switch(action.type){
        case 'IS_LOADING' : return { ...state, loading : action.payload}
        case 'VALIDATE_USER' : 
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
        return { ...state, loading : false, isAuthenticated : action.payload }
        default: return intialState;
    }

}