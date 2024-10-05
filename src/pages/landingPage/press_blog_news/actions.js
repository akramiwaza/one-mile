import {
  ChackImageIsFile,
  CheckDataIfExit,
  getLinkPagination,
} from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetPressBlogNews =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.landingPage.press_blog_news.get;
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

export const ManagePressBlogNews =
  ({ callback, values, editMode }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = new FormData();
      if (editMode) {
        bodyFormData.append("id", values?.id);
      }
      if (CheckDataIfExit(values?.text_ar)) {
        bodyFormData.append("text_ar", values?.text_ar?.trim());
      }
      if (CheckDataIfExit(values?.text_en)) {
        bodyFormData.append("text_en", values?.text_en?.trim());
      }
      if (CheckDataIfExit(values?.description_ar)) {
        bodyFormData.append("description_ar", values?.description_ar?.trim());
      }
      if (CheckDataIfExit(values?.description_en)) {
        bodyFormData.append("description_en", values?.description_en?.trim());
      }
      if (CheckDataIfExit(values?.type)) {
        bodyFormData.append("type", values?.type);
      }
      if (CheckDataIfExit(values?.links)) {
        bodyFormData.append("links", values?.links?.trim());
      }
      if (CheckDataIfExit(values?.order_number)) {
        bodyFormData.append("order_number", values?.order_number);
      }
      if (
        values?.media_link &&
        values?.media_link != null &&
        values?.media_link != undefined &&
        ChackImageIsFile({ data: values?.media_link, IsBoolean: true })
      ) {
        bodyFormData.append("media_link", values?.media_link);
        bodyFormData.append("media_link", "image");
      } else if (editMode && !values?.media_link) {
        bodyFormData.append("media_link", "");
      }
      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode
          ? UrlApi.landingPage.press_blog_news.edit
          : UrlApi.landingPage.press_blog_news.add,
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

export const EditPressBlogNews =
  ({ callback, allData, PressBlogNewsId, nameFailed, dataFailed }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data;
      if (allData) {
        data = allData;
      } else {
        data = {
          id: PressBlogNewsId,
          [nameFailed]: dataFailed,
        };
      }
      const response = await PostFunction({
        data,
        Route: UrlApi.landingPage.press_blog_news.edit,
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

export const DeletePressBlogNews =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        idsPressBlogNews: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.landingPage.press_blog_news.delete,
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
