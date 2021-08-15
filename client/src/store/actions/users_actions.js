import * as users from "./index";
import axios from "axios";
import {
  getAuthHeader,
  getTokenCookie,
  removeTokenCookie,
} from "../../utils/tools";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const registerUser = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/api/users/register`, {
        email: values.email,
        password: values.password,
      });

      dispatch(users.authUser({ data: user.data, auth: true }));
      dispatch(users.successGlobal("Welcome to FlickBase!"));
    } catch (error) {
      dispatch(users.errorGlobal(error.response.data.message));
    }
  };
};

export const signInUser = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(`/api/users/signin`, {
        email: values.email,
        password: values.password,
      });

      dispatch(users.authUser({ data: user.data, auth: true }));
      dispatch(users.successGlobal("Logged in successfully!"));
    } catch (error) {
      dispatch(users.errorGlobal(error.response.data.message));
    }
  };
};

export const isAuthUser = () => {
  return async (dispatch) => {
    try {
      if (!getTokenCookie()) {
        throw new Error();
      }
      const user = await axios(`/api/users/isauth`, getAuthHeader());
      dispatch(users.authUser({ data: user.data, auth: true }));
    } catch (error) {
      dispatch(users.authUser({ data: {}, auth: false }));
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    removeTokenCookie();
    dispatch(users.signOut());
  };
};

export const changeUserEmail = (data) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `/api/users/update_email`,
        {
          email: data.email,
          newemail: data.newEmail,
        },
        getAuthHeader()
      );

      dispatch(users.changeUserEmail(data.newEmail));
      dispatch(users.successGlobal("Email updated successfully!"));
    } catch (error) {
      dispatch(users.errorGlobal(error.response.data.message));
    }
  };
};

export const updateUserProfile = (data) => {
  return async (dispatch, getState) => {
    try {
      const profile = await axios.patch(
        `/api/users/profile`,
        data,
        getAuthHeader()
      );

      const userData = {
        ...getState().users.data,
        ...profile.data,
      };

      dispatch(users.updateUserProfile(userData));
      dispatch(users.successGlobal("Profile updated successfully!"));
    } catch (error) {
      dispatch(users.errorGlobal(error.response.data.message));
    }
  };
};

export const contactMe = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/users/contact`, data);
      dispatch(users.successGlobal("Message sent successfully!"));
    } catch (error) {
      dispatch(users.errorGlobal(error.response.data.message));
    }
  };
};

export const accountVerify = (token) => {
  return async (dispatch, getState) => {
    try {
      const user = getState().users.auth;

      await axios.get(`/api/users/verify?verification=${token}`);

      if (user) {
        dispatch(users.accountVerify());
      }
      dispatch(users.successGlobal("Account verified successfully!"));
    } catch (error) {
      dispatch(users.errorGlobal(error.response.data.message));
    }
  };
};
