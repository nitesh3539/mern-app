import axios from 'axios'

export default function setState(type, payload) {
    return {
        type,
        payload
    }
}

export const getItem = () => dispatch => {
    dispatch(setState('IS_LOADING', true))
    axios.get('/getProduct').then((res) => {
        dispatch(setState('GET_ITEMS', res.data))
    }).catch(err => console.log(err))

}

export const deleteItem = (id) => dispatch => {
    dispatch(setState('IS_LOADING', true))
    axios.delete(`/deleteProduct/${id}`).then((res) => {
        dispatch(setState('DELETE_ITEM', res.data.item._id))
    }).catch(err => console.log(err))
}

export const setItem = (data) => dispatch => {
    dispatch(setState('IS_LOADING', true))
    axios.post('/addProduct', data).then((res) => {
        dispatch(setState('SET_ITEM', res.data))
    })
}