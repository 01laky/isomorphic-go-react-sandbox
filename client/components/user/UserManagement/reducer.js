import {isEmpty} from 'lodash';
import {LOAD_USERS, RECEIVE_USERS, RECEIVE_USER, SET_EDITABLE} from './actions';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  users: [],
  selected: null,
}

export default function reducer(state = {}, action) {
  if (isEmpty(state)) {
    state = {...initialState};
  }
  switch (action.type) {
    case LOAD_USERS:
      return {...state, loading: true};

    case RECEIVE_USERS:
      return {...state, loading: false, loaded: true, users: action.payload};

    case RECEIVE_USER:
      const {payload: newUser} = action;
      const {users} = state;
      users.push(newUser);
      return {...state, loading: false, loaded: true, users};

    case SET_EDITABLE:
      const {payload: selectedUserId} = action;
      return {...state, selected: selectedUserId};

    default:
      return state;
  }
}
