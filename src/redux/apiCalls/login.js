import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
} from "../reducers/loginSlice";

const base_url = "https://ppp-base.vercel.app/api/";

export const loginUser = async (user, dispatch, router) => {
  dispatch(loginRequest());
  try {
    const userData = await axios.post(`/api/login`, {
      email: user.email,
      password: user.password,
    });
    // dispatch(loginSuccess(userData));
    console.log(userData);
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
