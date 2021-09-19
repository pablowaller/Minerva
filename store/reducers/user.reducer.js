import { USERS } from '../../data/usuarios';
import { SELECT_USERS, FILTER_USERS } from '../actions/user.actions';

const initialState = {
  list: USERS,
  filteredUsers: [],
  selectedID: null,
};

const UsersReducer = (state = initialState, action) => {
  switch(action.type) {
    case SELECT_USERS:
      return {
        ...state,
        selectedID: action.userID,
      };
    case FILTER_USERS:
      return {
        ...state,
        filteredUsers: state.list.filter(item => item.category === action.categoryID)
      }
    default:
      return state;
  }
}

export default UsersReducer;