import {combineReducers} from 'redux'

import itemReducer from './module/item/itemReducer'
import registerReducer from './module/register/registerReducer'
import authReducer from './module/auth/authReducer'
import errorReducer from './module/err/errorReducer'

const reducer = combineReducers({
    items : itemReducer,
    register : registerReducer,
    auth : authReducer,
    error : errorReducer
})

export default reducer