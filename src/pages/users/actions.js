import {
  ChackImageIsFile,
  CheckDataIfExit,
  CheckTypeFile,
  getLinkPagination,
} from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetUsers =
  ({ callback, orderBy, rowsPerPage, search, typeOrder, page }) =>
  async (dispatch, getState) => {
    try {
      let fieldsSearch = ["first_name", "last_name"];
      let link = `${UrlApi.users.get}?${getLinkPagination({
        page,
        fieldsSearch,
        orderBy: orderBy ?? "created_date",
        rowsPerPage,
        search,
        typeOrder,
      })}`;
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

export const GetCountries =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      let link = `${UrlApi.users.get_countries}`;
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

export const ManageUsers =
  ({ callback, values, editMode }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = new FormData();
      if (editMode) {
        bodyFormData.append("id", values?.id);
      }
      if (CheckDataIfExit(values?.first_name)) {
        bodyFormData.append("first_name", values?.first_name?.trim());
      }
      if (CheckDataIfExit(values?.last_name)) {
        bodyFormData.append("last_name", values?.last_name?.trim());
      }
      if (CheckDataIfExit(values?.phone_code)) {
        bodyFormData.append("phone_code", values?.phone_code);
      }
      if (CheckDataIfExit(values?.phone)) {
        bodyFormData.append("phone", values?.phone);
      }
      if (CheckDataIfExit(values?.email)) {
        bodyFormData.append("email", values?.email?.trim());
      }
      if (CheckDataIfExit(values?.country_id)) {
        bodyFormData.append("country_id", values?.country_id);
      }
      if (CheckDataIfExit(values?.language_teach)) {
        bodyFormData.append("language_teach", values?.language_teach);
      }
      if (CheckDataIfExit(values?.language_read)) {
        bodyFormData.append("language_read", values?.language_read);
      }
      if (CheckDataIfExit(values?.password)) {
        bodyFormData.append("password", values?.password?.trim());
      }
      if (
        values?.profile_image &&
        values?.profile_image != null &&
        values?.profile_image != undefined &&
        ChackImageIsFile({ data: values?.profile_image, IsBoolean: true })
      ) {
        bodyFormData.append("profile_image", values?.profile_image);
      } else if (editMode && !values?.profile_image) {
        bodyFormData.append("profile_image", "");
      }
      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode ? UrlApi.users.edit : UrlApi.users.add,
        showalert: true,
        state: getState,
        isMultipart: true,
        dispatch: dispatch,
      });
      dispatch(setLoading(false));
      callback(response);
    } catch (err) {
      dispatch(setLoading(false));
      callback(false);
    }
  };

export const EditUsers =
  ({ callback, allData, id, nameFailed, dataFailed }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data;
      if (allData) {
        data = allData;
      } else {
        data = {
          id: id,
          [nameFailed]: dataFailed,
        };
      }
      const response = await PostFunction({
        data,
        Route: UrlApi.users.edit,
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

export const DeleteUsers =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        ids: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.users.delete,
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
