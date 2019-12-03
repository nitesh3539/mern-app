import axios from 'axios'
import {returnErrors} from '../err/errorAction'
export const loadUser = () => (dispatch) => {
    // User loading
    dispatch({ type: 'IS_LOADING' });

    const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token' : localStorage.getItem('token')
        }
      };
  
    axios
      .get('/getUser', config)
      .then(res =>
        dispatch({
          type: 'USER_LOADED',
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: 'AUTH_ERROR'
        });
      });
  };

  export const logout = () => {
    return {
      type: 'LOGOUT_SUCCESS',
    };
  };