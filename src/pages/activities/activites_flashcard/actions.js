import {
  ChackImageIsFile,
  CheckDataIfExit,
  CheckTypeFile,
} from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetAcitivitiesFlashcard =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.activities.activities_flashcard.get;
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

export const ManageAcitvitiesFlashcard =
  ({ callback, values, editMode, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = {};
      if (editMode) {
        bodyFormData.id = values?.id;
      }
      bodyFormData.activitie_id = id;
      if (CheckDataIfExit(values?.description_en)) {
        bodyFormData.description_en = values?.description_en?.trim();
      }
      if (CheckDataIfExit(values?.description_ar)) {
        bodyFormData.description_ar = values?.description_ar?.trim();
      }
      if (CheckDataIfExit(values?.description_fr)) {
        bodyFormData.description_fr = values?.description_fr?.trim();
      }
      if (CheckDataIfExit(values?.flash_card_id)) {
        bodyFormData.flash_card_id = values?.flash_card_id;
      }
      if (CheckDataIfExit(values?.flash_card_category_id)) {
        bodyFormData.flash_card_category_id = values?.flash_card_category_id;
      }

      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode
          ? UrlApi.activities.activities_flashcard.edit
          : UrlApi.activities.activities_flashcard.add,
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

export const EditAcitvitiesFlashcard =
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
        Route: UrlApi.activities.activities_flashcard.edit,
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

export const DeleteAcitvitiesFlashcard =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        ids: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.activities.activities_flashcard.delete,
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
