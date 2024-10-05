import {
  ChackImageIsFile,
  CheckDataIfExit,
  getLinkPagination,
} from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetHowItwork =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.how_it_work.get;
      const response = await PostFunction({
        data: { id },
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

export const ManageHowItwork =
  ({ callback, values, editMode, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = new FormData();
      if (editMode) {
        bodyFormData.append("id", values?.id);
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

      if (CheckDataIfExit(values?.title_link_one)) {
        bodyFormData.append("title_link_one", values?.title_link_one?.trim());
      }
      if (CheckDataIfExit(values?.link_one)) {
        bodyFormData.append("link_one", values?.link_one?.trim());
      }
      if (CheckDataIfExit(values?.title_link_two)) {
        bodyFormData.append("title_link_two", values?.title_link_two?.trim());
      }
      if (CheckDataIfExit(values?.link_two)) {
        bodyFormData.append("link_two", values?.link_two?.trim());
      }
      if (CheckDataIfExit(values?.title_link_three)) {
        bodyFormData.append(
          "title_link_three",
          values?.title_link_three?.trim()
        );
      }
      if (CheckDataIfExit(values?.link_three)) {
        bodyFormData.append("link_three", values?.link_three?.trim());
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
        Route: editMode ? UrlApi.how_it_work.edit : UrlApi.how_it_work.add,
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

export const EditHowItWork =
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
        Route: UrlApi.how_it_work.edit,
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

export const DeleteHowItWork =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        idsHowItWorks: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.how_it_work.delete,
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
