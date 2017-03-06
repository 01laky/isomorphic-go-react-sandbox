import { userListLoadAction, userDomain } from "#app/features/User/SandCms/actions";

export default (dispatch, domain) => {
  return (nextState, replaceState, callback) => {
    // console.log('MAKE LOAD DISPATCH => ', dispatch);
    // console.log('MAKE LOAD DOMAIN => ', domain);
    console.log('MAKE LOAD ACTION => ', userListLoadAction);
    switch (domain) {
      case `${userDomain}.LIST/LOAD`:
        dispatch(userListLoadAction);
        return callback();

      default:
        return callback()
    }
  }
};
