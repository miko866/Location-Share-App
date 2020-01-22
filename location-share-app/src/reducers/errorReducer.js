import { GET_ERRORS } from '../actions/types';

// Create global state
const initialState = {};

export default function(state = initialState, action) {
  // Check the state type for error
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
