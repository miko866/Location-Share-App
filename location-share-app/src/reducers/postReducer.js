import {
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  GET_POST_BY_AUTHOR,
  GET_USERS,
  GET_USER,
} from '../actions/types';

// Create global state
const initialState = {
  posts: [],
  post: {},
  users: [],
  user: {},
};

// Manage all data from Server depend on action
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_POST_BY_AUTHOR:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    default:
      return state;
  }
}
