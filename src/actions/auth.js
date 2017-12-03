import api from '../api';
import { USER_LOGGED_IN } from './actionTypes';

export const userLoggedIn = (user) => {
  return {
    type: USER_LOGGED_IN,
    user
  }
}

export const login = credentials => dispatch => {
  return api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));
}