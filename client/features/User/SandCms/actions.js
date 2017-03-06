export const userDomain = `USER`;

export const userListLoadAction = {
  type: `${userDomain}.LIST/LOAD`,
};

export const userDetailLoadAction = (userId) => {
  return {
    type: `${userDomain}.LIST/LOAD`,
    meta: {id: userId},
  };
}
