const register = registrationData => {
  return {
    types: ["POST_USERS_REQUEST", "POST_USERS_SUCCESS", "POST_USERS_FAILURE"],
    payload: {
      request: {
        url: "/register",
        data: registrationData,
        method: "post"
      }
    }
  };
};

export default dispatch => {
  return {
    onRegister: registrationData => dispatch(register(registrationData))
  };
};
