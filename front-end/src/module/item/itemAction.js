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
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token' : localStorage.getItem('token')
        }
      };
      console.log('deleteItem',config)
    axios.delete(`/deleteProduct/${id}`, config).then((res) => {
        dispatch(setState('DELETE_ITEM', res.data.item._id))
    }).catch(err => console.log(err))
}

export const setItem = (data) => dispatch => {
    dispatch(setState('IS_LOADING', true))
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token' : localStorage.getItem('token')
        }
      };

      console.log('setItem',config)
    axios.post('/addProduct', data, config).then((res) => {
        dispatch(setState('SET_ITEM', res.data))
    })
}