import { CheckDataIfExit } from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetStats =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.landingPage.stats.get;
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

export const ManageStats =
  ({ callback, values, editMode }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = {};
      if (editMode) {
        bodyFormData.id = values?.id;
      }
      if (CheckDataIfExit(values?.desc_en)) {
        bodyFormData.desc_en = values?.desc_en?.trim();
      }
      if (CheckDataIfExit(values?.desc_ar)) {
        bodyFormData.desc_ar = values?.desc_ar?.trim();
      }
      if (CheckDataIfExit(values?.value)) {
        bodyFormData.value = values?.value?.trim();
      }
      if (CheckDataIfExit(values?.order_number)) {
        bodyFormData.order_number = values?.order_number;
      }

      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode
          ? UrlApi.landingPage.stats.edit
          : UrlApi.landingPage.stats.add,
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

export const EditStats =
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
        Route: UrlApi.landingPage.stats.edit,
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

export const DeleteStats =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        idsimpact_stats: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.landingPage.stats.delete,
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
