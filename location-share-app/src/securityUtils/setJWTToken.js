import axios from 'axios';

// Send JWT Token back on server for auth
const setJWTToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setJWTToken;
