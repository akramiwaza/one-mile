import { ChackImageIsFile, getLinkPagination } from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetAdmins =
  ({ callback, page, rowsPerPage, search, orderBy, typeOrder }) =>
  async (dispatch, getState) => {
    try {
      let fieldsSearch = ["username", "email", "fullname"];

      let link = `${UrlApi.admins.get}?${getLinkPagination({
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
      callback(response.data);
    } catch (err) {
      callback(false);
    }
  };

export const ManageAdmin =
  ({ callback, values, editMode }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = new FormData();
      if (editMode) {
        bodyFormData.append("id", values?.id);
      }
      bodyFormData.append("email", values?.email?.trim());
      bodyFormData.append("fullname", values?.fullname?.trim());
      if (values?.password) {
        bodyFormData.append("password", values?.password?.trim());
      }
      bodyFormData.append("phone", values?.phone?.trim());
      bodyFormData.append("user_type_id", values?.user_type_id);
      bodyFormData.append("username", values?.username?.trim());
      if (
        values?.main_img &&
        values?.main_img != null &&
        values?.main_img != undefined &&
        ChackImageIsFile({ data: values?.main_img, IsBoolean: true })
      ) {
        bodyFormData.append("main_img", values?.main_img);
      } else if (editMode && !values?.main_img) {
        bodyFormData.append("main_img", "");
      }
      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode ? UrlApi.admins.edit : UrlApi.admins.add,
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

export const EditAdmin =
  ({ callback, allData, adminId, nameFailed, dataFailed }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data;
      if (allData) {
        data = allData;
      } else {
        data = {
          id: adminId,
          [nameFailed]: dataFailed,
        };
      }
      const response = await PostFunction({
        data,
        Route: UrlApi.admins.edit,
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

export const DeleteAdmin =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        idsAdmin: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.admins.delete,
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
