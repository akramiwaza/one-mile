import {
  ChackImageIsFile,
  CheckDataIfExit,
  CheckTypeFile,
} from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetAcitivitiesMedia =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.activities.activities_media.get;
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

export const ManageAcitvitiesMedia =
  ({ callback, values, editMode, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = new FormData();
      if (editMode) {
        bodyFormData.append("id", values?.id);
      }
      bodyFormData.append("activitie_id", id);
      if (CheckDataIfExit(values?.title_en)) {
        bodyFormData.append("title_en", values?.title_en?.trim());
      }
      if (CheckDataIfExit(values?.title_fr)) {
        bodyFormData.append("title_fr", values?.title_fr?.trim());
      }
      if (CheckDataIfExit(values?.title_ar)) {
        bodyFormData.append("title_ar", values?.title_ar?.trim());
      }
      if (CheckDataIfExit(values?.description_en)) {
        bodyFormData.append("description_en", values?.description_en);
      }
      if (CheckDataIfExit(values?.description_fr)) {
        bodyFormData.append("description_fr", values?.description_fr);
      }
      if (CheckDataIfExit(values?.description_ar)) {
        bodyFormData.append("description_ar", values?.description_ar);
      }
      if (CheckDataIfExit(values?.media_name_en)) {
        bodyFormData.append("media_name_en", values?.media_name_en);
      }
      if (
        values?.media_link_en &&
        values?.media_link_en != null &&
        values?.media_link_en != undefined &&
        ChackImageIsFile({ data: values?.media_link_en, IsBoolean: true })
      ) {
        bodyFormData.append("media_link_en", values?.media_link_en);
      } else if (editMode && !values?.media_link_en) {
        bodyFormData.append("media_link_en", "");
      }

      if (CheckDataIfExit(values?.media_name_fr)) {
        bodyFormData.append("media_name_fr", values?.media_name_fr);
      }
      if (
        values?.media_link_fr &&
        values?.media_link_fr != null &&
        values?.media_link_fr != undefined &&
        ChackImageIsFile({ data: values?.media_link_fr, IsBoolean: true })
      ) {
        bodyFormData.append("media_link_fr", values?.media_link_fr);
      } else if (editMode && !values?.media_link_fr) {
        bodyFormData.append("media_link_fr", "");
      }

      if (CheckDataIfExit(values?.media_name_ar)) {
        bodyFormData.append("media_name_ar", values?.media_name_ar);
      }
      if (
        values?.media_link_ar &&
        values?.media_link_ar != null &&
        values?.media_link_ar != undefined &&
        ChackImageIsFile({
          data: values?.media_link_ar,
          IsBoolean: true,
        })
      ) {
        bodyFormData.append("media_link_ar", values?.media_link_ar);
      } else if (editMode && !values?.media_link_ar) {
        bodyFormData.append("media_link_ar", "");
      }

      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode
          ? UrlApi.activities.activities_media.edit
          : UrlApi.activities.activities_media.add,
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

export const EditAcitvitiesMedia =
  ({ callback, allData, CategoryAcitivitesId, nameFailed, dataFailed }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data;
      if (allData) {
        data = allData;
      } else {
        data = {
          id: CategoryAcitivitesId,
          [nameFailed]: dataFailed,
        };
      }
      const response = await PostFunction({
        data,
        Route: UrlApi.activities.activities_media.edit,
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

export const DeleteAcitvitiesMedia =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        ids: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.activities.activities_media.delete,
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
