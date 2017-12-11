import api from '../api';
import { userLoggedIn } from './auth';

export const signup = data => dispatch => {
  return api.user.signup(data)
    .then(user => {
      localStorage.bookwormJWT = user.token;
      dispatch(userLoggedIn(user))
    })
}