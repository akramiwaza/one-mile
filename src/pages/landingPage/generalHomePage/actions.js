import {
  ChackImageIsFile,
  CheckDataIfExit,
  CheckTypeFile,
  getLinkPagination,
} from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetSettings =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.settings.get;
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

export const ManageSettings =
  ({ callback, values, editMode }) =>
  async (dispatch, getState) => {
    try {
      console.log({ imageeee: values?.about_app_media });
      dispatch(setLoading(true));
      var bodyFormData = new FormData();

      if (CheckDataIfExit(values?.about_app_ar)) {
        bodyFormData.append("about_app_ar", values?.about_app_ar ?? "");
      }
      if (CheckDataIfExit(values?.about_app_en)) {
        bodyFormData.append("about_app_en", values?.about_app_en ?? "");
      }
      if (
        values?.about_app_media &&
        values?.about_app_media != null &&
        values?.about_app_media != undefined &&
        ChackImageIsFile({ data: values?.about_app_media, IsBoolean: true })
      ) {
        bodyFormData.append("about_app_media", values?.about_app_media);
        bodyFormData.append(
          "about_app_media_type",
          CheckTypeFile({
            name: values?.about_app_media.name,
          })
        );
      } else if (!values?.about_app_media) {
        bodyFormData.append("about_app_media", "");
        bodyFormData.append("about_app_media_type", "");
      }

      const response = await PostFunction({
        data: bodyFormData,
        Route: UrlApi.settings.edit,
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
