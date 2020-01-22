import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  user: {},
  validToken: false,
};

// Check payload from server
const BooleanActionPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

// Create user wit JWT token
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: BooleanActionPayload(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
