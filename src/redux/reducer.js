import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
} from "./actionTypes";
const initialState = {
  loading: false,
  users: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    case DELETE_USER_SUCCESS:
      const filteredUsers = state.users.filter(
        (user) => user.id !== action.payload.id
      );
      return {
        loading: false,
        users: filteredUsers,
        error: "",
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
