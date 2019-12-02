import { createStore, applyMiddleware, } from 'redux'
import thunk from 'redux-thunk'

import combineReducer from './combineReducer'

const middleWare = [thunk];


const store = createStore(combineReducer, {}, applyMiddleware(...middleWare))

export default store