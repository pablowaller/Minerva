import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import CategoryReducer from "./reducers/category.reducer";
import UsersReducer from "./reducers/user.reducer";
import ChatReducer from './reducers/chat.reducer';
import AuthReducer from './reducers/auth.reducer';

const RootReducer = combineReducers({
  categories: CategoryReducer,
  userss: UsersReducer,
  cart: ChatReducer,
  auth: AuthReducer,
});

export default createStore(RootReducer, applyMiddleware(thunk));