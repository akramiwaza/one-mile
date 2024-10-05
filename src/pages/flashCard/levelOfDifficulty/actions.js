import { ChackImageIsFile, CheckDataIfExit } from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetLevelOfDifficulty =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.flashcard.level_of_difficulty.get;
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

export const ManageLevelOfDifficulty =
  ({ callback, values, editMode }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = {};
      if (editMode) {
        bodyFormData.id = values?.id;
      }
      if (CheckDataIfExit(values?.title_en)) {
        bodyFormData.title_en = values?.title_en?.trim();
      }
      if (CheckDataIfExit(values?.title_ar)) {
        bodyFormData.title_ar = values?.title_ar?.trim();
      }
      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode
          ? UrlApi.flashcard.level_of_difficulty.edit
          : UrlApi.flashcard.level_of_difficulty.add,
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

export const DeleteLevelOfDifficulty =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        ids: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.flashcard.level_of_difficulty.delete,
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
