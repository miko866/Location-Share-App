import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import postReducer from './postReducer';
import securityReducer from './securityReducer';

export default combineReducers({
  errors: errorReducer,
  post: postReducer,
  security: securityReducer,
});
