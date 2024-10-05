import { el } from "date-fns/locale";
import {
  ChackImageIsFile,
  CheckDataIfExit,
  getLinkPagination,
} from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const Getimpacts =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.landingPage.impacts.get;
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

export const Manageimpacts =
  ({ callback, values, editMode }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = new FormData();
      if (editMode) {
        bodyFormData.append("id", values?.id);
      }
      if (CheckDataIfExit(values?.title_en)) {
        bodyFormData.append("title_en", values?.title_en?.trim());
      }
      if (CheckDataIfExit(values?.title_ar)) {
        bodyFormData.append("title_ar", values?.title_ar?.trim());
      }
      if (CheckDataIfExit(values?.number)) {
        bodyFormData.append("number", values?.number);
      }

      if (CheckDataIfExit(values?.order_number)) {
        bodyFormData.append("order_number", values?.order_number);
      }
      if (
        values?.icon &&
        values?.icon != null &&
        values?.icon != undefined &&
        ChackImageIsFile({ data: values?.icon, IsBoolean: true })
      ) {
        bodyFormData.append("icon", values?.icon);
      } else if (editMode && !values?.icon) {
        bodyFormData.append("icon", "");
      }
      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode
          ? UrlApi.landingPage.impacts.edit
          : UrlApi.landingPage.impacts.add,
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

export const Editimpacts =
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
        Route: UrlApi.landingPage.impacts.edit,
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

export const Deleteimpacts =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        idsimpact_stats: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.landingPage.impacts.delete,
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
