import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setJWTToken from '../securityUtils/setJWTToken';
import jwtDecode from 'jwt-decode';

//* Create new user in SinginComponent
export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    // Connect to Server
    await axios.post('/api/users/register', newUser);
    // Without errors redirect
    history.push('/login');
    // Take errors
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    // Save errors
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

//*  Login in LoginComponent
export const login = (LoginRequest) => async (dispatch) => {
  try {
    // Connect toserver
    const res = await axios.post('/api/users/login', LoginRequest);
    // Extract token from res.data
    const { token } = res.data;
    // Store the token in the localStorage
    sessionStorage.setItem('jwtToken', token);

    // Set our token in header ***
    setJWTToken(token);

    // Decode token on React
    const decoded = jwtDecode(token);

    // Dispatch to securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

//* Logout in Navbar
export const logout = () => (dispatch) => {
  // Remove Token from sessionStorage
  sessionStorage.removeItem('jwtToken');
  // Logout for current user
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
