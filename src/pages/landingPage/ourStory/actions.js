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
      dispatch(setLoading(true));
      var bodyFormData = new FormData();
      if (CheckDataIfExit(values?.our_story_text_en)) {
        bodyFormData.append(
          "our_story_text_en",
          values?.our_story_text_en ?? ""
        );
      }
      if (CheckDataIfExit(values?.our_story_text_ar)) {
        bodyFormData.append(
          "our_story_text_ar",
          values?.our_story_text_ar ?? ""
        );
      }
      if (CheckDataIfExit(values?.our_story_text_mobile_en)) {
        bodyFormData.append(
          "our_story_text_mobile_en",
          values?.our_story_text_mobile_en ?? ""
        );
      }
      if (CheckDataIfExit(values?.our_story_text_mobile_ar)) {
        bodyFormData.append(
          "our_story_text_mobile_ar",
          values?.our_story_text_mobile_ar ?? ""
        );
      }

      if (CheckDataIfExit(values?.our_story_text_two_ar)) {
        bodyFormData.append(
          "our_story_text_two_ar",
          values?.our_story_text_two_ar ?? ""
        );
      }
      if (CheckDataIfExit(values?.our_story_text_two_en)) {
        bodyFormData.append(
          "our_story_text_two_en",
          values?.our_story_text_two_en ?? ""
        );
      }
      if (
        values?.our_story_image &&
        values?.our_story_image != null &&
        values?.our_story_image != undefined &&
        ChackImageIsFile({
          data: values?.our_story_image,
          IsBoolean: true,
        })
      ) {
        bodyFormData.append("our_story_image", values?.our_story_image);
      } else if (!values?.our_story_image) {
        bodyFormData.append("our_story_image", "");
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
