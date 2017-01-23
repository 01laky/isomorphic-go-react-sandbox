import { combineReducers } from 'redux';
import { SET_CONFIG } from './actions';
import userManagement from './components/user/UserManagement/reducer';
import { reducer as formReducer } from 'redux-form'

function config(state = {}, action) {
  switch (action.type) {
    case SET_CONFIG:
      return action.config;
    default:
      return state;
  }
}

export default combineReducers({config, userManagement, form: formReducer});
