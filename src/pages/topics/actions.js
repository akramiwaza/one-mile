import {
  ChackImageIsFile,
  CheckDataIfExit,
  getLinkPagination,
} from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetTopics =
  ({ callback, id, getSub = false, alphabetical = false }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.topics.get;
      const response = await PostFunction({
        data: { id, getSub, alphabetical },
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

export const ManageTopics =
  ({ callback, values, editMode, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = new FormData();
      if (editMode) {
        bodyFormData.append("id", values?.id);
      }
      if (CheckDataIfExit(values?.color_code)) {
        bodyFormData.append("color_code", values?.color_code);
      }
      if (CheckDataIfExit(values?.title_ar)) {
        bodyFormData.append("title_ar", values?.title_ar?.trim());
      }
      if (CheckDataIfExit(values?.title_en)) {
        bodyFormData.append("title_en", values?.title_en?.trim());
      }
      if (CheckDataIfExit(values?.title_fr)) {
        bodyFormData.append("title_fr", values?.title_fr?.trim());
      }
      if (CheckDataIfExit(values?.tag_ar)) {
        bodyFormData.append("tag_ar", values?.tag_ar?.trim());
      }
      if (CheckDataIfExit(values?.tag_en)) {
        bodyFormData.append("tag_en", values?.tag_en?.trim());
      }
      if (CheckDataIfExit(values?.tag_fr)) {
        bodyFormData.append("tag_fr", values?.tag_fr?.trim());
      }
      if (CheckDataIfExit(values?.description_ar)) {
        bodyFormData.append("description_ar", values?.description_ar?.trim());
      }
      if (CheckDataIfExit(values?.description_en)) {
        bodyFormData.append("description_en", values?.description_en?.trim());
      }
      if (CheckDataIfExit(values?.description_fr)) {
        bodyFormData.append("description_fr", values?.description_fr?.trim());
      }
      if (CheckDataIfExit(values?.order_number)) {
        bodyFormData.append("order_number", values?.order_number);
      }
      if (CheckDataIfExit(id)) {
        bodyFormData.append("parent_id", id);
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
      if (
        values?.media_link_two &&
        values?.media_link_two != null &&
        values?.media_link_two != undefined &&
        ChackImageIsFile({ data: values?.media_link_two, IsBoolean: true })
      ) {
        bodyFormData.append("media_link_two", values?.media_link_two);
      } else if (editMode && !values?.media_link_two) {
        bodyFormData.append("media_link_two", "");
      }
      if (
        values?.media_link_three &&
        values?.media_link_three != null &&
        values?.media_link_three != undefined &&
        ChackImageIsFile({ data: values?.media_link_three, IsBoolean: true })
      ) {
        bodyFormData.append("media_link_three", values?.media_link_three);
      } else if (editMode && !values?.media_link_three) {
        bodyFormData.append("media_link_three", "");
      }
      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode ? UrlApi.topics.edit : UrlApi.topics.add,
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

export const EditTopics =
  ({ callback, allData, slidershowId, nameFailed, dataFailed }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data;
      if (allData) {
        data = allData;
      } else {
        data = {
          id: slidershowId,
          [nameFailed]: dataFailed,
        };
      }
      const response = await PostFunction({
        data,
        Route: UrlApi.topics.edit,
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

export const DeleteTopics =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        idsTopics: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.topics.delete,
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
