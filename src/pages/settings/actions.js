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
      if (CheckDataIfExit(values?.app_version)) {
        bodyFormData.append("app_version", values?.app_version ?? 1);
      }

      if (CheckDataIfExit(values?.force_update)) {
        bodyFormData.append("force_update", values?.force_update ?? "");
      }
      if (CheckDataIfExit(values?.maintenance_mode)) {
        bodyFormData.append("maintenance_mode", values?.maintenance_mode ?? "");
      }
      if (CheckDataIfExit(values?.text_maintenance_ar)) {
        bodyFormData.append(
          "text_maintenance_ar",
          values?.text_maintenance_ar ?? ""
        );
      }
      if (CheckDataIfExit(values?.text_maintenance_en)) {
        bodyFormData.append(
          "text_maintenance_en",
          values?.text_maintenance_en ?? ""
        );
      }
      if (CheckDataIfExit(values?.text_maintenance_fr)) {
        bodyFormData.append(
          "text_maintenance_fr",
          values?.text_maintenance_fr ?? ""
        );
      }
      if (CheckDataIfExit(values?.text_update_ar)) {
        bodyFormData.append("text_update_ar", values?.text_update_ar ?? "");
      }
      if (CheckDataIfExit(values?.text_update_en)) {
        bodyFormData.append("text_update_en", values?.text_update_en ?? "");
      }
      if (CheckDataIfExit(values?.text_update_fr)) {
        bodyFormData.append("text_update_fr", values?.text_update_fr ?? "");
      }
      if (CheckDataIfExit(values?.terms_and_conditions_ar)) {
        bodyFormData.append(
          "terms_and_conditions_ar",
          values?.terms_and_conditions_ar ?? ""
        );
      }
      if (CheckDataIfExit(values?.terms_and_conditions_en)) {
        bodyFormData.append(
          "terms_and_conditions_en",
          values?.terms_and_conditions_en ?? ""
        );
      }
      if (CheckDataIfExit(values?.terms_and_conditions_fr)) {
        bodyFormData.append(
          "terms_and_conditions_fr",
          values?.terms_and_conditions_fr ?? ""
        );
      }

      if (CheckDataIfExit(values?.apple_store_link)) {
        bodyFormData.append("apple_store_link", values?.apple_store_link ?? "");
      }
      if (CheckDataIfExit(values?.google_play_link)) {
        bodyFormData.append("google_play_link", values?.google_play_link ?? "");
      }
      if (CheckDataIfExit(values?.huawei_store_link)) {
        bodyFormData.append(
          "huawei_store_link",
          values?.huawei_store_link ?? ""
        );
      }
      if (CheckDataIfExit(values?.facebook_link)) {
        bodyFormData.append("facebook_link", values?.facebook_link ?? "");
      }
      if (CheckDataIfExit(values?.instgram_link)) {
        bodyFormData.append("instgram_link", values?.instgram_link ?? "");
      }
      if (CheckDataIfExit(values?.x_link)) {
        bodyFormData.append("x_link", values?.x_link ?? "");
      }
      if (CheckDataIfExit(values?.youtube_link)) {
        bodyFormData.append("youtube_link", values?.youtube_link ?? "");
      }
      if (CheckDataIfExit(values?.linkedin_link)) {
        bodyFormData.append("linkedin_link", values?.linkedin_link ?? "");
      }
      if (CheckDataIfExit(values?.webapp_link)) {
        bodyFormData.append("webapp_link", values?.webapp_link ?? "");
      }
      if (CheckDataIfExit(values?.video_home_page)) {
        bodyFormData.append("video_home_page", values?.video_home_page ?? "");
      }

      if (CheckDataIfExit(values?.general_keywords)) {
        bodyFormData.append("general_keywords", values?.general_keywords ?? "");
      }
      if (CheckDataIfExit(values?.general_description)) {
        bodyFormData.append(
          "general_description",
          values?.general_description ?? ""
        );
      }
      if (CheckDataIfExit(values?.privacy_policy_ar)) {
        bodyFormData.append(
          "privacy_policy_ar",
          values?.privacy_policy_ar ?? ""
        );
      }
      if (CheckDataIfExit(values?.privacy_policy_en)) {
        bodyFormData.append(
          "privacy_policy_en",
          values?.privacy_policy_en ?? ""
        );
      }
      if (CheckDataIfExit(values?.phonenumber)) {
        bodyFormData.append("phonenumber", values?.phonenumber ?? "");
      }
      if (CheckDataIfExit(values?.email)) {
        bodyFormData.append("email", values?.email ?? "");
      }

      if (
        values?.general_image &&
        values?.general_image != null &&
        values?.general_image != undefined &&
        ChackImageIsFile({ data: values?.general_image, IsBoolean: true })
      ) {
        bodyFormData.append("general_image", values?.general_image);
      } else if (!values?.general_image) {
        bodyFormData.append("general_image", "");
      }

      if (
        values?.image_impact_page &&
        values?.image_impact_page != null &&
        values?.image_impact_page != undefined &&
        ChackImageIsFile({
          data: values?.image_impact_page,
          IsBoolean: true,
        })
      ) {
        bodyFormData.append("image_impact_page", values?.image_impact_page);
      } else if (!values?.image_impact_page) {
        bodyFormData.append("image_impact_page", "");
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
