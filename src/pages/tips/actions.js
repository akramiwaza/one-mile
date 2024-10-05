import {
  ChackImageIsFile,
  CheckDataIfExit,
  getLinkPagination,
} from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetTips =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.tips.get;
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

export const ManageTips =
  ({ callback, values, editMode }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = new FormData();
      if (editMode) {
        bodyFormData.append("id", values?.id);
      }
      if (CheckDataIfExit(values?.cat_id)) {
        bodyFormData.append("cat_id", values?.cat_id);
      }
      if (CheckDataIfExit(values?.title_ar)) {
        bodyFormData.append("title_ar", values?.title_ar?.trim());
      }
      if (CheckDataIfExit(values?.title_en)) {
        bodyFormData.append("title_en", values?.title_en?.trim());
      }
      if (CheckDataIfExit(values?.description_ar)) {
        bodyFormData.append("description_ar", values?.description_ar?.trim());
      }
      if (CheckDataIfExit(values?.description_en)) {
        bodyFormData.append("description_en", values?.description_en?.trim());
      }
      if (
        values?.media_link &&
        values?.media_link != null &&
        values?.media_link != undefined &&
        ChackImageIsFile({ data: values?.media_link, IsBoolean: true })
      ) {
        bodyFormData.append("media_link", values?.media_link);
      } else if (editMode && !values?.media_link) {
        bodyFormData.append("media_link", "");
      }
      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode ? UrlApi.tips.edit : UrlApi.tips.add,
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

export const EditTips =
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
        Route: UrlApi.tips.edit,
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

export const DeleteTips =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        ids: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.tips.delete,
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
