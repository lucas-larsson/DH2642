import { combineReducers } from 'redux';
//reducers
import userReducer from './userReducer';
import boardReducer from './boardReducer';
import userProjectsReducer from './userProjectsReducer';

const rootReducer = combineReducers({
  userState: userReducer,
  boardState: boardReducer,
  userProjectsState: userProjectsReducer,
});

export default rootReducer;
