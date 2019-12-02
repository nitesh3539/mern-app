import {combineReducers} from 'redux'

import itemReducer from './module/item/itemReducer'

const reducer = combineReducers({
    items : itemReducer
})

export default reducer