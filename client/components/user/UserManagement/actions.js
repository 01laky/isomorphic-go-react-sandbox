import {initialize} from 'redux-form';
import {getRandomString} from './helpers';

export const LOAD_USERS = 'LOAD_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const POST_USER = 'POST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const SET_EDITABLE = 'SET_EDITABLE';
export const RECEIVE_UPDATED_USER = 'RECEIVE_UPDATED_USER';

export function loadUsers() {
  return {type: LOAD_USERS};
}

export function receiveUsers(nextUsers) {
  return {type: RECEIVE_USERS, payload: nextUsers};
}

export function receiveUser(nextUser) {
  return {type: RECEIVE_USER, payload: nextUser};
}

export function receiveUpdatedUser(updatedUser) {
  return {type: RECEIVE_UPDATED_USER, payload: updatedUser};
}



export function setEditable(userId) {
  return {type: SET_EDITABLE, payload: userId};
}

export function reinitializeForm(userId, random, users) {
  const fields = ['name', 'email'];
  if (userId) {
    let initialUser;
    users.forEach(user => {
      if (user.ID === userId) {
        initialUser = user;
      }
    });
    return initialize(
      'user',
      {
        name: initialUser.Name,
        email: initialUser.Email
      },
      fields
    )
  } else if (random) {
    return initialize(
      'user',
      {
        name: `${getRandomString()}  ${getRandomString()}`,
        email: `${getRandomString()}@${getRandomString()}.com`
      },
      fields
    )
  }
}
