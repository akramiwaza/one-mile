import { ChackImageIsFile, CheckDataIfExit } from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetCategoryAcitivities =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.activities.category.get;
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

export const ManageCategoryAcitvities =
  ({ callback, values, editMode }) =>
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
      if (CheckDataIfExit(values?.parent_id)) {
        bodyFormData.append("parent_id", values?.parent_id);
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
        Route: editMode
          ? UrlApi.activities.category.edit
          : UrlApi.activities.category.add,
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

export const EditCategoryAcitvities =
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
        Route: UrlApi.activities.category.edit,
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

export const DeleteCategoryAcitvities =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        idsCategory: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.activities.category.delete,
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
