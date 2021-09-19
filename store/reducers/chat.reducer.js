import { ADD_USER, REMOVE_USER, CONFIRM_CHAT } from '../actions/chat.actions';

const INITIAL_STATE = {
  users: [],
  total: 0,
  status: 'inactive',
};

const sumTotal = (list) => list
  .map(user => user.librosEnComun)
  .reduce((a, b) => a + b, 0);

const ChatReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_USER:
      const index = state.users.findIndex(user => user.id === action.user.id);
      if (index === -1) {
        const user = { ...action.user, librosEnComun: 1 };
        const updateChat = [...state.users, user];

        return {
          ...state,
          users: updateChat,
          total: sumTotal(updateChat),
        };
      }

      const users = state.users.map(user => {
        if (user.id === action.user.id) user.librosEnComun ++
        return user;
      })

      return {
        ...state,
        users,
        total: sumTotal(users),
      };
      
    case REMOVE_USER:
      const updateUsers = state.users.filter(user => user.id !== action.userID);
      return {
        ...state,
        users: updateUsers,
        total: sumTotal(updateUsers),
      };

    case CONFIRM_CHAT:
      return {
        ...state,
        users: [],
        status: action.status,
      };

    default:
      return state;
  };
};

export default ChatReducer;