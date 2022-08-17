import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER,
  PUSH_USER,
} from "./actionTypes";
import axios from "axios";

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (user) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: user,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest);
    axios
      // .get("https://jsonplaceholder.typicode.com/users")
      .get("http://192.168.1.158:7000/api/getAllUsers")
      .then((res) => {
        const users = res.data.data;
        console.log(users);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(fetchUsersFailure(errMsg));
      });
  };
};

const deleteUserById = (id) => {
  return {
    type: DELETE_USER,
    payload: {
      _id: id,
    },
  };
};

export const deleteUser = (delId) => {
  return (dispatch) => {
    dispatch(deleteUserById(delId));
  };
};

export const pushUser = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest);
    axios
      .push("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data;
        console.log(users);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(fetchUsersFailure(errMsg));
      });
  };
};
