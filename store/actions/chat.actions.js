import { URL_API } from '../../constants/Database';

export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const CONFIRM_CHAT = 'CONFIRM_CHAT';

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const removeUser = (userID) => ({
  type: REMOVE_USER,
  userID,
});

export const confirmChat = (payload) => {
  return async dispatch => {
    try {
      dispatch({
        type: CONFIRM_CHAT,
        status: 'loading',
      });

      const response = await fetch(`${URL_API}/chat.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: Date.now(),
          items: { ...payload },
        }),
      });

      const result = await response.json();

      console.log(result)

      dispatch({
        type: CONFIRM_CHAT,
        status: 'success',
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: CONFIRM_CHAT,
        status: 'error',
      });
    }
  }
}