import { PostFunction } from "src/utils/axios_connection";
import { removeUserInfo, setDataPrivileges, setUserInfo } from "./reducerUser";
import UrlApi from "src/utils/Url";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import {
  dataLocalStorage,
  getLocalStorage,
  removeAllLocalStorage,
  saveLocalStorage,
} from "src/helper/publicFunction";
import { RouterName } from "src/routes/RouterName";

export const login =
  ({ email, password, expire, callback }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const data = {
        email,
        password,
        expire: expire ? 30 : 1,
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.auth.login,
        showalert: true,
        state: getState,
        isMultipart: false,
        dispatch: dispatch,
      });
      saveLocalStorage(dataLocalStorage.userinfo, response?.data);
      saveLocalStorage(dataLocalStorage.privileges, response?.dataPrivileges);
      dispatch(setUserInfo(response?.data));
      dispatch(setDataPrivileges(response?.dataPrivileges));
      dispatch(setLoading(false));
      callback(true);
    } catch (err) {
      callback(false);
    }
  };

export const Autologin =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      const response = await PostFunction({
        data: {},
        Route: UrlApi.auth.autologin,
        showalert: false,
        state: getState,
        isMultipart: false,
        dispatch: dispatch,
      });
      saveLocalStorage(dataLocalStorage.userinfo, response?.data);
      saveLocalStorage(dataLocalStorage.privileges, response?.dataPrivileges);
      dispatch(setUserInfo(response?.data));
      dispatch(setDataPrivileges(response?.dataPrivileges));
      callback();
    } catch (err) {
      callback();
    }
  };

export const signup =
  ({ email, password, phone, username, fullname, user_type_id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const data = {
        email,
        password,
        phone,
        username,
        fullname,
        user_type_id,
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.auth.signup,
        showalert: true,
        state: getState,
        isMultipart: false,
        dispatch: dispatch,
      });
      dispatch(setLoading(false));
    } catch (err) {}
  };

export const Logout =
  ({ navigate = null }) =>
  async (dispatch, getState) => {
    try {
      const data = getLocalStorage(dataLocalStorage.userinfo);
      if (data.token) {
        dispatch(setLoading(true));
        const response = await PostFunction({
          data: {},
          Route: UrlApi.auth.logout,
          showalert: true,
          state: getState,
          isMultipart: false,
          dispatch: dispatch,
        });
        if (response) {
          removeAllLocalStorage();
          dispatch(removeUserInfo());
          dispatch(setLoading(false));
          if (navigate) {
            navigate(RouterName.auth.login);
          } else {
            window.location.reload(false);
          }
        } else {
          dispatch(setLoading(false));
        }
      } else {
        removeAllLocalStorage();
        dispatch(removeUserInfo());
        if (navigate) {
          navigate(RouterName.auth.login);
        } else {
          window.location.reload(false);
        }
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

export const ForgotPasswordFunction =
  ({ email, callback }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const fullUrl = window.location.href;
      const parsedUrl = new URL(fullUrl);
      const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}:${parsedUrl.port}`;
      const response = await PostFunction({
        data: {
          email,
          currentDomain: baseUrl,
        },
        Route: UrlApi.auth.forgotPassword,
        showalert: true,
        state: getState,
        isMultipart: false,
        dispatch: dispatch,
      });
      if (response) {
        dispatch(setLoading(false));
        callback(response);
      } else {
        dispatch(setLoading(false));
        callback(false);
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

export const ResetPasswordFunction =
  ({ token, newPassword, callback }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const response = await PostFunction({
        data: {
          newPassword,
          token,
        },
        Route: UrlApi.auth.resetPassword,
        showalert: true,
        state: getState,
        isMultipart: false,
        dispatch: dispatch,
      });
      if (response) {
        dispatch(setLoading(false));
        callback(response);
      } else {
        dispatch(setLoading(false));
        callback(false);
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };
