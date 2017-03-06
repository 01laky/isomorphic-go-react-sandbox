import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const userDomain = `USER`

function* fetchUsers(action) {
   try {
      const users = yield call(axios.get, '/api/user');
      console.log('DB USERS??? => ', users);
      yield put({type: `${userDomain}.LIST/RECEIVE`, users: users});
   } catch (err) {
      yield put({type: `${userDomain}.LIST/FAIL`, error: err});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export default function* sagas() {
  console.log('SAGA CALLL?', `${userDomain}.LIST/LOAD`)
  yield [takeEvery(`${userDomain}.LIST/LOAD`, fetchUsers)];
}
