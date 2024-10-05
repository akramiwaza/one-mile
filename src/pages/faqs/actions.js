import { CheckDataIfExit } from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetFaqs =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.faqs.get;
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

export const ManageFaqs =
  ({ callback, values, editMode }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = {};
      if (editMode) {
        bodyFormData.id = values?.id;
      }
      if (CheckDataIfExit(values?.title_ar)) {
        bodyFormData.title_ar = values?.title_ar?.trim();
      }
      if (CheckDataIfExit(values?.title_en)) {
        bodyFormData.title_en = values?.title_en?.trim();
      }
      if (CheckDataIfExit(values?.description_ar)) {
        bodyFormData.description_ar = values?.description_ar;
      }
      if (CheckDataIfExit(values?.description_en)) {
        bodyFormData.description_en = values?.description_en;
      }
      if (CheckDataIfExit(values?.order_number)) {
        bodyFormData.order_number = values?.order_number;
      }

      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode ? UrlApi.faqs.edit : UrlApi.faqs.add,
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

export const EditFaqs =
  ({ callback, allData, FaqsId, nameFailed, dataFailed }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data;
      if (allData) {
        data = allData;
      } else {
        data = {
          id: FaqsId,
          [nameFailed]: dataFailed,
        };
      }
      const response = await PostFunction({
        data,
        Route: UrlApi.faqs.edit,
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

export const DeleteFaqs =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        idsfaqs: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.faqs.delete,
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
