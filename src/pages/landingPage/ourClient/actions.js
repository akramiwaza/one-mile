import { ChackImageIsFile, CheckDataIfExit } from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetOurClient =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.landingPage.our_client.get;
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

export const ManageOurClient =
  ({ callback, values, editMode }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = new FormData();
      if (editMode) {
        bodyFormData.append("id", values?.id);
      }
      if (CheckDataIfExit(values?.title)) {
        bodyFormData.append("title", values?.title?.trim());
      }
      if (CheckDataIfExit(values?.link)) {
        bodyFormData.append("link", values?.link?.trim());
      }
      if (CheckDataIfExit(values?.order_number)) {
        bodyFormData.append("order_number", values?.order_number);
      }
      if (
        values?.logo &&
        values?.logo != null &&
        values?.logo != undefined &&
        ChackImageIsFile({ data: values?.logo, IsBoolean: true })
      ) {
        bodyFormData.append("logo", values?.logo);
      } else if (editMode && !values?.logo) {
        bodyFormData.append("logo", "");
      }
      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode
          ? UrlApi.landingPage.our_client.edit
          : UrlApi.landingPage.our_client.add,
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

export const DeleteOurClient =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        idsOurClient: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.landingPage.our_client.delete,
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
