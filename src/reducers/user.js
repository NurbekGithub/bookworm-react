import { USER_LOGGED_IN } from '../actions/actionTypes';

export default function user(state = {}, action) {
  switch(action.type) {
    case USER_LOGGED_IN:
      return action.user;

    default: return state;
  }
}