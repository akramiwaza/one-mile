import {
  ChackImageIsFile,
  CheckDataIfExit,
  getLinkPagination,
} from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetFlashcardDetailsPage =
  ({ callback, page, rowsPerPage, search, orderBy, typeOrder, id }) =>
  async (dispatch, getState) => {
    try {
      let fieldsSearch = ["title_ar", "title_en", "title_fr"];

      let link = `${UrlApi.flashcard.flashcardDetails.get}?${getLinkPagination({
        page,
        fieldsSearch,
        orderBy: orderBy ?? "order_number",
        rowsPerPage,
        search,
        typeOrder: typeOrder ?? "ASC",
      })}`;
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

export const ManageFlashCardDetails =
  ({ callback, values, editMode, flash_card_id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = new FormData();
      if (editMode) {
        bodyFormData.append("id", values?.id);
      }
      bodyFormData.append("flash_card_id", flash_card_id);
      bodyFormData.append("title_ar", values?.title_ar?.trim());
      bodyFormData.append("title_en", values?.title_en?.trim());
      bodyFormData.append("title_fr", values?.title_fr?.trim());
      if (
        values?.image_en &&
        values?.image_en != null &&
        values?.image_en != undefined &&
        ChackImageIsFile({ data: values?.image_en, IsBoolean: true })
      ) {
        bodyFormData.append("image_en", values?.image_en);
      } else if (editMode && !values?.image_en) {
        bodyFormData.append("image_en", "");
      }

      if (
        values?.image_ar &&
        values?.image_ar != null &&
        values?.image_ar != undefined &&
        ChackImageIsFile({ data: values?.image_ar, IsBoolean: true })
      ) {
        bodyFormData.append("image_ar", values?.image_ar);
      } else if (editMode && !values?.image_ar) {
        bodyFormData.append("image_ar", "");
      }

      if (
        values?.image_fr &&
        values?.image_fr != null &&
        values?.image_fr != undefined &&
        ChackImageIsFile({ data: values?.image_fr, IsBoolean: true })
      ) {
        bodyFormData.append("image_fr", values?.image_fr);
      } else if (editMode && !values?.image_fr) {
        bodyFormData.append("image_fr", "");
      }
      if (CheckDataIfExit(values?.order_number)) {
        bodyFormData.append("order_number", values?.order_number);
      }

      if (
        values?.image_not_text &&
        values?.image_not_text != null &&
        values?.image_not_text != undefined &&
        ChackImageIsFile({ data: values?.image_not_text, IsBoolean: true })
      ) {
        bodyFormData.append("image_not_text", values?.image_not_text);
      } else if (editMode && !values?.image_not_text) {
        bodyFormData.append("image_not_text", "");
      }

      if (
        values?.image_colored_en &&
        values?.image_colored_en != null &&
        values?.image_colored_en != undefined &&
        ChackImageIsFile({ data: values?.image_colored_en, IsBoolean: true })
      ) {
        bodyFormData.append("image_colored_en", values?.image_colored_en);
      } else if (editMode && !values?.image_colored_en) {
        bodyFormData.append("image_colored_en", "");
      }

      if (
        values?.image_colored_ar &&
        values?.image_colored_ar != null &&
        values?.image_colored_ar != undefined &&
        ChackImageIsFile({
          data: values?.image_colored_ar,
          IsBoolean: true,
        })
      ) {
        bodyFormData.append("image_colored_ar", values?.image_colored_ar);
      } else if (editMode && !values?.image_colored_ar) {
        bodyFormData.append("image_colored_ar", "");
      }

      if (
        values?.image_colored_fr &&
        values?.image_colored_fr != null &&
        values?.image_colored_fr != undefined &&
        ChackImageIsFile({
          data: values?.image_colored_fr,
          IsBoolean: true,
        })
      ) {
        bodyFormData.append("image_colored_fr", values?.image_colored_fr);
      } else if (editMode && !values?.image_colored_fr) {
        bodyFormData.append("image_colored_fr", "");
      }

      if (
        values?.image_colored_not_text &&
        values?.image_colored_not_text != null &&
        values?.image_colored_not_text != undefined &&
        ChackImageIsFile({
          data: values?.image_colored_not_text,
          IsBoolean: true,
        })
      ) {
        bodyFormData.append(
          "image_colored_not_text",
          values?.image_colored_not_text
        );
      } else if (editMode && !values?.image_colored_not_text) {
        bodyFormData.append("image_colored_not_text", "");
      }

      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode
          ? UrlApi.flashcard.flashcardDetails.edit
          : UrlApi.flashcard.flashcardDetails.add,
        showalert: true,
        state: getState,
        isMultipart: true,
        dispatch: dispatch,
      });
      dispatch(setLoading(false));
      callback(response);
    } catch (err) {
      console.error(err);
      dispatch(setLoading(false));
      callback(false);
    }
  };

export const EditFlashCardDetails =
  ({ callback, allData, id, nameFailed, dataFailed }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data;
      if (allData) {
        data = allData;
      } else {
        data = {
          id: id,
          [nameFailed]: dataFailed,
        };
      }
      const response = await PostFunction({
        data,
        Route: UrlApi.flashcard.flashcardDetails.edit,
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

export const DeleteFlashCardDetails =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        ids: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.flashcard.flashcardDetails.delete,
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
