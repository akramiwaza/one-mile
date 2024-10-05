import { ChackImageIsFile, getLinkPagination } from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetUserType =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.admins.getUserType;
      const response = await PostFunction({
        data: {},
        Route: link,
        showalert: false,
        state: getState,
        isMultipart: false,
        dispatch: dispatch,
      });
      callback(response);
    } catch (err) {
      callback(false);
    }
  };

export const GetUserPrivileges =
  ({ callback, type_id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let link = UrlApi.admins.getUserPrivilegs;
      const response = await PostFunction({
        data: { type_id: type_id },
        Route: link,
        showalert: false,
        state: getState,
        isMultipart: false,
        dispatch: dispatch,
      });
      dispatch(setLoading(false));
      callback(response);
    } catch (err) {
      dispatch(setLoading(false));
      callback(false);
    }
  };

export const ManageAdminPrivileges =
  ({ callback, values, privilegName, editMode, type_id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      console.log({ values });
      let body = {
        ListFunctions: JSON.stringify(values),
        privilegName: privilegName,
      };
      if (type_id) {
        body.type_id = type_id;
      }
      console.log({ body });
      const response = await PostFunction({
        data: body,
        Route: editMode
          ? UrlApi.admins.editUserPrivilegs
          : UrlApi.admins.addUserPrivilegs,
        showalert: true,
        state: getState,
        isMultipart: false,
        dispatch: dispatch,
      });
      dispatch(setLoading(false));
      callback(response);
    } catch (err) {
      dispatch(setLoading(false));
      callback(false);
    }
  };

export const DeleteAdminPrivilege =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        idsPrivileg: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.admins.deleteprivileg,
        showalert: true,
        state: getState,
        isMultipart: false,
        dispatch: dispatch,
      });
      dispatch(setLoading(false));
      callback(response);
    } catch (err) {
      dispatch(setLoading(false));
      callback(false);
    }
  };
