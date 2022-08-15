import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
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
      .get("https://jsonplaceholder.typicode.com/users")
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

const deleteUserSuccess = (id) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: id,
  };
};
const deleteUserFailure = (err) => {
  return {
    type: DELETE_USER_FAILURE,
    payload: err,
  };
};

export const deleteUser = (delId) => {
  const deleteURL = `http://192.168.1.143:8000/api/deleteProfile/${delId}`;
  console.log(delId);
  return (dispatch) => {
    axios
      .delete(deleteURL)
      .then((res) => {
        console.log(res);
        dispatch(deleteUserSuccess(delId));
        // setOpen(false);
        // setLocationMessage({ msg: "User Deleted", variant: "error" });
        // refreshData();
        // handleClick();
        // enqueueSnackbar("User Deleted", { variant: "error" });
      })
      .catch((err) => {
        console.log(err);
        const errMsg = err.message;
        dispatch(deleteUserFailure(errMsg));
      });
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
