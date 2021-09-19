import { CHATS_GRUPALES } from '../../data/chats.grupales';
import { SELECT_CHAT_GRUPAL } from '../actions/category.actions';

const initialState = {
  list: CHATS_GRUPALES,
  selectedID: null,
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CHAT_GRUPAL:
      return {
        ...state,
        selectedID: action.categoryID,
      };
    default:
      return state;
  }
}

export default CategoryReducer;
