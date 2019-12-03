import axios from 'axios'
import {returnErrors} from '../err/errorAction'

export default function setState(type, payload) {
    return {
        type,
        payload
    }
}


export const register = (data) => dispatch => {
    dispatch(setState('IS_LOADING', true))
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    axios.post(`/addUser`,JSON.stringify(data),config).then((res) => {
        console.log("resdata",res)
        dispatch(setState('REGISTER_SUCCESS', res.data))
    }).catch(err => {
        console.log("errRegister",err)
        dispatch(
          returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
        );
        dispatch({
          type: 'REGISTER_FAIL'
        });
      });
}