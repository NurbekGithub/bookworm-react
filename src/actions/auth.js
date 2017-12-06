import api from '../api';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actionTypes';

export const userLoggedOut = () => {
  return {
    type: USER_LOGGED_OUT
  }
}

export const userLoggedIn = (user) => {
  return {
    type: USER_LOGGED_IN,
    user
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('bookwormJWT');
  dispatch(userLoggedOut());
}

export const login = credentials => dispatch => {
  return api.user.login(credentials).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user))
  });
}