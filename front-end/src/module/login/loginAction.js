import axios from 'axios'
import {returnErrors} from '../err/errorAction'

export default function setState(type, payload) {
    return {
        type,
        payload
    }
}

export const login = (data) => dispatch => {
    dispatch(setState('IS_LOADING', true))
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    axios.post('/validateUser', JSON.stringify(data), config).then((res) => {
        dispatch(setState('LOGIN_SUCCESS', res.data))
    }).catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        );
        dispatch({
          type: 'LOGIN_FAIL'
        });
      });
}