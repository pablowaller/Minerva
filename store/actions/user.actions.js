export const SELECT_USERS = 'SELECT_USERS';
export const FILTER_USERS = 'FILTER_USERS';

export const selectUser = (userID) => ({
  type: SELECT_USERS,
  userID,
});

export const filterUsers = (categoryID) => ({
  type: FILTER_USERS,
  categoryID,
})