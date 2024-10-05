import { CheckDataIfExit } from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetContactAs =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.contact_as.get;
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

export const ManageContactAs =
  ({ callback, values, editMode }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = {};
      if (editMode) {
        bodyFormData.id = values?.id;
      }
      if (CheckDataIfExit(values?.phone)) {
        bodyFormData.phone = values?.phone?.trim();
      }
      if (CheckDataIfExit(values?.whatsapp)) {
        bodyFormData.whatsapp = values?.whatsapp?.trim();
      }
      if (CheckDataIfExit(values?.email)) {
        bodyFormData.email = values?.email?.trim();
      }
      if (CheckDataIfExit(values?.description_ar)) {
        bodyFormData.description_ar = values?.description_ar;
      }
      if (CheckDataIfExit(values?.description_en)) {
        bodyFormData.description_en = values?.description_en;
      }
      if (CheckDataIfExit(values?.link_map)) {
        bodyFormData.link_map = values?.link_map?.trim();
      }
      if (CheckDataIfExit(values?.color_code)) {
        bodyFormData.color_code = values?.color_code;
      }
      if (CheckDataIfExit(values?.country_en)) {
        bodyFormData.country_en = values?.country_en;
      }
      if (CheckDataIfExit(values?.country_ar)) {
        bodyFormData.country_ar = values?.country_ar;
      }
      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode ? UrlApi.contact_as.edit : UrlApi.contact_as.add,
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

export const EditContactAs =
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
        Route: UrlApi.contact_as.edit,
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

export const DeleteContactAs =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        idscontact_as: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.contact_as.delete,
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
