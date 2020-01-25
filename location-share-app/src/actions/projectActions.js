import axios from 'axios';
import {
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  GET_POST_BY_AUTHOR,
  GET_USERS,
  GET_USER,
} from './types';

//  Create new post in CreateLocation component
export const createPost = (project, history) => async (dispatch) => {
  try {
    // Connection to Server
    await axios.post('/api/posts', project, { headers: { 'content-type': 'multipart/form-data' } });
    history.push('/');
  } catch (error) {
    // Save errors into redux
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

// Show all posts in Dashboard component
export const getPosts = () => async (dispatch) => {
  // Connection to Server
  const res = await axios.get('/api/posts/allPosts');
  // Give me data
  dispatch({
    type: GET_POSTS,
    payload: res.data,
  });
};

// Show all users in UsersCard component
export const getUsers = () => async (dispatch) => {
  // Connection to Server
  const res = await axios.get('/api/users/allUsers');
  // Give me data
  dispatch({
    type: GET_USERS,
    payload: res.data,
  });
};

export const getUser = (id) => async (dispatch) => {
  // Connection to Server
  const res = await axios.get(`/api/users/${id}`);
  // Give me data
  dispatch({
    type: GET_USER,
    payload: res.data,
  });
};

// Show all posts by author in LocationCardUserPosts component
export const getPostsByAuthor = () => async (dispatch) => {
  // Connection to Server
  const res = await axios.get(`/api/posts/allPostsByAuthor`);
  // Give me data
  dispatch({
    type: GET_POST_BY_AUTHOR,
    payload: res.data,
  });
};

// Show post in EditLocation component
export const getPost = (id) => async (dispatch) => {
  // Connection to Server
  const res = await axios.get(`/api/posts/${id}`);
  // Give me data
  dispatch({
    type: GET_POST,
    payload: res.data,
  });
};

// Delete post in Dashboard & LocationCardUserPosts
export const deletePost = (id) => async (dispatch) => {
  if (window.confirm('Are you sure?')) {
    // Connection to Server
    await axios.delete(`/api/posts/deletePost/${id}`);
    // Delete it
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  }
};
