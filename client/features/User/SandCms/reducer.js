import {isEmpty} from 'lodash';
import {userDomain} from './actions';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  users: [],
  selected: null,
}

export default (state = {}, action = {}) => {
  if (isEmpty(state)) {
    state = {...initialState};
  }
  switch (action.type) {
    case `${userDomain}.LIST/LOAD`:
      return {...state, loading: true};

    case `${userDomain}.LIST/RECEIVE`:
      return {...state, loading: false, loaded: true, users: action.payload};

    default:
      return state;
  }
}
