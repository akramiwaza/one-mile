import {
  ChackImageIsFile,
  CheckDataIfExit,
  CheckTypeFile,
  getLinkPagination,
  inputType,
} from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetAcitivities =
  ({ callback, page, rowsPerPage, search, orderBy, typeOrder, category_id }) =>
  async (dispatch, getState) => {
    try {
      let fieldsSearch = ["title_en", "title_ar", "title_fr"];

      let link = `${UrlApi.activities.activities.get}?${getLinkPagination({
        page,
        fieldsSearch,
        orderBy: orderBy ?? "order_number",
        rowsPerPage,
        search,
        typeOrder,
      })}`;
      const response = await PostFunction({
        data: { category_id },
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

export const ManageAcitvities =
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
      } else {
        bodyFormData.append("title_ar", "");
      }
      if (CheckDataIfExit(values?.title_en)) {
        bodyFormData.append("title_en", values?.title_en?.trim());
      } else {
        bodyFormData.append("title_en", "");
      }
      if (CheckDataIfExit(values?.title_fr)) {
        bodyFormData.append("title_fr", values?.title_fr?.trim());
      } else {
        bodyFormData.append("title_fr", "");
      }
      if (CheckDataIfExit(values?.category_id)) {
        bodyFormData.append("category_id", values?.category_id);
      }
      if (values?.category_id == 1 || values?.category_id >= 3) {
        if (CheckDataIfExit(values?.description_en)) {
          bodyFormData.append("description_en", values?.description_en?.trim());
        } else {
          bodyFormData.append("description_en", "");
        }
        if (CheckDataIfExit(values?.description_ar)) {
          bodyFormData.append("description_ar", values?.description_ar?.trim());
        } else {
          bodyFormData.append("description_ar", "");
        }
        if (CheckDataIfExit(values?.description_fr)) {
          bodyFormData.append("description_fr", values?.description_fr?.trim());
        } else {
          bodyFormData.append("description_fr", "");
        }
      } else {
        bodyFormData.append("description_en", "");
        bodyFormData.append("description_ar", "");
        bodyFormData.append("description_fr", "");
      }
      if (values?.category_id != 1) {
        if (CheckDataIfExit(values?.prepare_ar)) {
          bodyFormData.append("prepare_ar", values?.prepare_ar?.trim());
        } else {
          bodyFormData.append("prepare_ar", "");
        }
        if (CheckDataIfExit(values?.prepare_en)) {
          bodyFormData.append("prepare_en", values?.prepare_en?.trim());
        } else {
          bodyFormData.append("prepare_en", "");
        }
        if (CheckDataIfExit(values?.prepare_fr)) {
          bodyFormData.append("prepare_fr", values?.prepare_fr?.trim());
        } else {
          bodyFormData.append("prepare_fr", "");
        }
      } else {
        bodyFormData.append("prepare_ar", "");
        bodyFormData.append("prepare_en", "");
        bodyFormData.append("prepare_fr", "");
      }
      if (values?.category_id == 2 || values?.category_id >= 4) {
        if (CheckDataIfExit(values?.play_ar)) {
          bodyFormData.append("play_ar", values?.play_ar?.trim());
        } else {
          bodyFormData.append("play_ar", "");
        }
        if (CheckDataIfExit(values?.play_en)) {
          bodyFormData.append("play_en", values?.play_en?.trim());
        } else {
          bodyFormData.append("play_en", "");
        }
        if (CheckDataIfExit(values?.play_fr)) {
          bodyFormData.append("play_fr", values?.play_fr?.trim());
        } else {
          bodyFormData.append("play_fr", "");
        }
      } else {
        bodyFormData.append("play_ar", "");
        bodyFormData.append("play_en", "");
        bodyFormData.append("play_fr", "");
      }
      if (values?.category_id > 1) {
        if (CheckDataIfExit(values?.extend_ar)) {
          bodyFormData.append("extend_ar", values?.extend_ar?.trim());
        } else {
          bodyFormData.append("extend_ar", "");
        }
        if (CheckDataIfExit(values?.extend_en)) {
          bodyFormData.append("extend_en", values?.extend_en?.trim());
        } else {
          bodyFormData.append("extend_en", "");
        }
        if (CheckDataIfExit(values?.extend_fr)) {
          bodyFormData.append("extend_fr", values?.extend_fr?.trim());
        } else {
          bodyFormData.append("extend_fr", "");
        }
      } else {
        bodyFormData.append("extend_ar", "");
        bodyFormData.append("extend_en", "");
        bodyFormData.append("extend_fr", "");
      }
      if (CheckDataIfExit(values?.topic)) {
        bodyFormData.append("topic", values?.topic);
      } else {
        bodyFormData.append("topic", []);
      }
      if (CheckDataIfExit(values?.sub_topic)) {
        bodyFormData.append("sub_topic", values?.sub_topic);
      } else {
        bodyFormData.append("sub_topic", []);
      }
      if (CheckDataIfExit(values?.agerange)) {
        bodyFormData.append("agerange", values?.agerange);
      } else {
        bodyFormData.append("agerange", []);
      }
      if (CheckDataIfExit(values?.level_of_difficulty)) {
        bodyFormData.append("level_of_difficulty", values?.level_of_difficulty);
      } else {
        bodyFormData.append("level_of_difficulty", []);
      }
      if (CheckDataIfExit(values?.is_feature)) {
        bodyFormData.append("is_feature", values?.is_feature);
      }
      if (CheckDataIfExit(values?.order_number)) {
        bodyFormData.append("order_number", values?.order_number);
      } else {
        bodyFormData.append("order_number", 0);
      }
      if (CheckDataIfExit(values?.video_link_en)) {
        bodyFormData.append("video_link_en", values?.video_link_en);
      } else {
        bodyFormData.append("video_link_en", "");
      }
      if (CheckDataIfExit(values?.video_link_fr)) {
        bodyFormData.append("video_link_fr", values?.video_link_fr);
      } else {
        bodyFormData.append("video_link_fr", "");
      }
      if (CheckDataIfExit(values?.video_link_ar)) {
        bodyFormData.append("video_link_ar", values?.video_link_ar);
      } else {
        bodyFormData.append("video_link_ar", "");
      }

      if (values?.category_id >= 4) {
        if (CheckDataIfExit(values?.limited_space_en)) {
          bodyFormData.append("limited_space_en", values?.limited_space_en);
        } else {
          bodyFormData.append("limited_space_en", "");
        }
        if (CheckDataIfExit(values?.limited_space_fr)) {
          bodyFormData.append("limited_space_fr", values?.limited_space_fr);
        } else {
          bodyFormData.append("limited_space_fr", "");
        }
        if (CheckDataIfExit(values?.limited_space_ar)) {
          bodyFormData.append("limited_space_ar", values?.limited_space_ar);
        } else {
          bodyFormData.append("limited_space_ar", "");
        }
      } else {
        bodyFormData.append("limited_space_en", "");
        bodyFormData.append("limited_space_fr", "");
        bodyFormData.append("limited_space_ar", "");
      }
      if (values?.category_id == 3 || values?.category_id > 4) {
        if (CheckDataIfExit(values?.tips_en)) {
          bodyFormData.append("tips_en", values?.tips_en);
        } else {
          bodyFormData.append("tips_en", "");
        }
        if (CheckDataIfExit(values?.tips_fr)) {
          bodyFormData.append("tips_fr", values?.tips_fr);
        } else {
          bodyFormData.append("tips_fr", "");
        }
        if (CheckDataIfExit(values?.tips_ar)) {
          bodyFormData.append("tips_ar", values?.tips_ar);
        } else {
          bodyFormData.append("tips_ar", "");
        }
        if (CheckDataIfExit(values?.technique_en)) {
          bodyFormData.append("technique_en", values?.technique_en);
        } else {
          bodyFormData.append("technique_en", "");
        }
        if (CheckDataIfExit(values?.technique_fr)) {
          bodyFormData.append("technique_fr", values?.technique_fr);
        } else {
          bodyFormData.append("technique_fr", "");
        }
        if (CheckDataIfExit(values?.technique_ar)) {
          bodyFormData.append("technique_ar", values?.technique_ar);
        } else {
          bodyFormData.append("technique_ar", "");
        }
      } else {
        bodyFormData.append("tips_en", "");
        bodyFormData.append("tips_fr", "");
        bodyFormData.append("tips_ar", "");
        bodyFormData.append("technique_en", "");
        bodyFormData.append("technique_fr", "");
        bodyFormData.append("technique_ar", "");
      }
      if (values?.category_id == 1 || values?.category_id > 4) {
        if (CheckDataIfExit(values?.instructions_en)) {
          bodyFormData.append("instructions_en", values?.instructions_en);
        } else {
          bodyFormData.append("instructions_en", "");
        }
        if (CheckDataIfExit(values?.instructions_fr)) {
          bodyFormData.append("instructions_fr", values?.instructions_fr);
        } else {
          bodyFormData.append("instructions_fr", "");
        }
        if (CheckDataIfExit(values?.instructions_ar)) {
          bodyFormData.append("instructions_ar", values?.instructions_ar);
        } else {
          bodyFormData.append("instructions_ar", "");
        }
        if (CheckDataIfExit(values?.track_one_name)) {
          bodyFormData.append("track_one_name", values?.track_one_name);
        } else {
          bodyFormData.append("track_one_name", "");
        }
        if (CheckDataIfExit(values?.track_one_name_fr)) {
          bodyFormData.append("track_one_name_fr", values?.track_one_name_fr);
        } else {
          bodyFormData.append("track_one_name_fr", "");
        }
        if (CheckDataIfExit(values?.track_one_name_ar)) {
          bodyFormData.append("track_one_name_ar", values?.track_one_name_ar);
        } else {
          bodyFormData.append("track_one_name_ar", "");
        }
        if (CheckDataIfExit(values?.track_two_name)) {
          bodyFormData.append("track_two_name", values?.track_two_name);
        } else {
          bodyFormData.append("track_two_name", "");
        }
        if (CheckDataIfExit(values?.track_two_name_fr)) {
          bodyFormData.append("track_two_name_fr", values?.track_two_name_fr);
        } else {
          bodyFormData.append("track_two_name_fr", "");
        }
        if (CheckDataIfExit(values?.track_two_name_ar)) {
          bodyFormData.append("track_two_name_ar", values?.track_two_name_ar);
        } else {
          bodyFormData.append("track_two_name_ar", "");
        }
        if (CheckDataIfExit(values?.lyrics_track_one)) {
          bodyFormData.append("lyrics_track_one", values?.lyrics_track_one);
        } else {
          bodyFormData.append("lyrics_track_one", "");
        }
        if (CheckDataIfExit(values?.lyrics_track_one_fr)) {
          bodyFormData.append(
            "lyrics_track_one_fr",
            values?.lyrics_track_one_fr
          );
        } else {
          bodyFormData.append("lyrics_track_one_fr", "");
        }
        if (CheckDataIfExit(values?.lyrics_track_one_ar)) {
          bodyFormData.append(
            "lyrics_track_one_ar",
            values?.lyrics_track_one_ar
          );
        } else {
          bodyFormData.append("lyrics_track_one_ar", "");
        }

        if (
          values?.track_one_url &&
          values?.track_one_url != null &&
          values?.track_one_url != undefined &&
          ChackImageIsFile({ data: values?.track_one_url, IsBoolean: true })
        ) {
          bodyFormData.append("track_one_url", values?.track_one_url);
        } else if (editMode && !values?.track_one_url) {
          bodyFormData.append("track_one_url", "");
        }
        if (
          values?.track_one_url_fr &&
          values?.track_one_url_fr != null &&
          values?.track_one_url_fr != undefined &&
          ChackImageIsFile({ data: values?.track_one_url_fr, IsBoolean: true })
        ) {
          bodyFormData.append("track_one_url_fr", values?.track_one_url_fr);
        } else if (editMode && !values?.track_one_url_fr) {
          bodyFormData.append("track_one_url_fr", "");
        }
        if (
          values?.track_one_url_ar &&
          values?.track_one_url_ar != null &&
          values?.track_one_url_ar != undefined &&
          ChackImageIsFile({
            data: values?.track_one_url_ar,
            IsBoolean: true,
          })
        ) {
          bodyFormData.append("track_one_url_ar", values?.track_one_url_ar);
        } else if (editMode && !values?.track_one_url_ar) {
          bodyFormData.append("track_one_url_ar", "");
        }
        if (
          values?.track_two_url &&
          values?.track_two_url != null &&
          values?.track_two_url != undefined &&
          ChackImageIsFile({ data: values?.track_two_url, IsBoolean: true })
        ) {
          bodyFormData.append("track_two_url", values?.track_two_url);
        } else if (editMode && !values?.track_two_url) {
          bodyFormData.append("track_two_url", "");
        }
      } else {
        bodyFormData.append("instructions_en", "");
        bodyFormData.append("instructions_fr", "");
        bodyFormData.append("instructions_ar", "");
        bodyFormData.append("song_language", "");
        bodyFormData.append("track_one_name", "");
        bodyFormData.append("track_two_name", "");
        bodyFormData.append("lyrics_track_one", "");
        bodyFormData.append("track_one_url", "");
        bodyFormData.append("track_two_url", "");
      }
      if (
        values?.media_link &&
        values?.media_link != null &&
        values?.media_link != undefined &&
        ChackImageIsFile({ data: values?.media_link, IsBoolean: true })
      ) {
        bodyFormData.append("media_link", values?.media_link);
        bodyFormData.append(
          "media_type",
          CheckTypeFile({
            name: values?.media_link.name,
          })
        );
      } else if (editMode && !values?.media_link) {
        bodyFormData.append("media_link", "");
        bodyFormData.append("media_type", "");
      }
      const response = await PostFunction({
        data: bodyFormData,
        Route: editMode
          ? UrlApi.activities.activities.edit
          : UrlApi.activities.activities.add,
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

export const EditAcitvities =
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
        Route: UrlApi.activities.activities.edit,
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

export const DeleteAcitvities =
  ({ callback, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      let data = {
        ids: JSON.stringify(id),
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.activities.activities.delete,
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

export const SetField = ({
  callback,
  id,
  setarray,
  CategoryAcitivities,
  AgeRange,
  LevelOfDifficulty,
  Topics,
  SubTopics,
}) => {
  if (id == 1) {
    // songs not done
    setarray([
      {
        failed: "id",
        type: inputType.text,
        title: "id",
        placeholder: "",
        fullwidth: true,
        customdesign: { display: "none" },
      },
      CategoryAcitivities && {
        failed: "category_id",
        type: inputType.dropdown,
        title: "Category",
        placeholder: "",
        fullwidth: true,
        datadropdown: CategoryAcitivities,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      {
        failed: "title_en",
        type: inputType.text,
        title: "Title (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "title_fr",
          type: inputType.text,
          title: "Title (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "title_ar",
            type: inputType.text,
            title: "Title (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
      },
      Topics && {
        failed: "topic",
        type: inputType.multipleSelect,
        title: "Topics",
        placeholder: "",
        fullwidth: true,
        datadropdown: Topics,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },

      SubTopics && {
        failed: "sub_topic",
        type: inputType.multipleSelect,
        title: "Sub topics",
        placeholder: "",
        fullwidth: true,
        datadropdown: SubTopics,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      AgeRange && {
        failed: "agerange",
        type: inputType.multipleSelect,
        title: "Age range",
        placeholder: "",
        fullwidth: true,
        datadropdown: AgeRange,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      LevelOfDifficulty && {
        failed: "level_of_difficulty",
        type: inputType.multipleSelect,
        title: "Anything else",
        placeholder: "",
        fullwidth: true,
        datadropdown: LevelOfDifficulty,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      {
        failed: "video_link_en",
        type: inputType.text,
        title: "Video link (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "video_link_fr",
          type: inputType.text,
          title: "Video link (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "video_link_ar",
            type: inputType.text,
            title: "Video link (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
      },
      {
        failed: "song_language",
        type: inputType.dropdown,
        title: "Song language",
        placeholder: "",
        fullwidth: true,
        datadropdown: [
          { title: "EN", id: "EN" },
          { title: "FR", id: "FR" },
          { title: "AR", id: "AR" },
        ],
        faileddropdown: {
          name: "title",
          value: "id",
        },
      },
      {
        failed: "track_one_name",
        type: inputType.text,
        title: "Track with voice name (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "track_one_name_fr",
          type: inputType.text,
          title: "Track with voice name (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "track_one_name_ar",
            type: inputType.text,
            title: "Track with voice name (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
      },
      {
        failed: "track_one_url",
        type: inputType.image,
        title: "Track with voice (EN)",
        placeholder: "",
        fullwidth: true,
        fileTypes: ["MP3", "WAV", "MP4", "AAC", "FLAC", "OGG"],
        multiple: false,
        label: "Drag & Drop media file here or click to select",
        fileOrFiles: "File", //Array or File or null
        child: {
          failed: "track_one_url_fr",
          type: inputType.image,
          title: "Track with voice (FR)",
          placeholder: "",
          fullwidth: true,
          fileTypes: ["MP3", "WAV", "MP4", "AAC", "FLAC", "OGG"],
          multiple: false,
          label: "Drag & Drop media file here or click to select",
          fileOrFiles: "File", //Array or File or null
          child: {
            failed: "track_one_url_ar",
            type: inputType.image,
            title: "Track with voice (AR)",
            placeholder: "",
            fullwidth: true,
            fileTypes: ["MP3", "WAV", "MP4", "AAC", "FLAC", "OGG"],
            multiple: false,
            label: "Drag & Drop media file here or click to select",
            fileOrFiles: "File", //Array or File or null
          },
        },
      },
      {
        failed: "track_two_name",
        type: inputType.text,
        title: "Track without voice name (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "track_two_name_fr",
          type: inputType.text,
          title: "Track without voice name (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "track_two_name_ar",
            type: inputType.text,
            title: "Track without voice name (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
      },
      {
        failed: "track_two_url",
        type: inputType.image,
        title: "Track without voice",
        placeholder: "",
        fullwidth: true,
        fileTypes: ["MP3", "WAV", "MP4", "AAC", "FLAC", "OGG"],
        multiple: false,
        label: "Drag & Drop media file here or click to select",
        fileOrFiles: "File", //Array or File or null
      },
      {
        failed: "description_en",
        type: inputType.editor,
        title: "Description (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "description_fr",
        type: inputType.editor,
        title: "Description (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "description_ar",
        type: inputType.editor,
        title: "Description (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "lyrics_track_one",
        type: inputType.editor,
        title: "Lyrics (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "lyrics_track_one_fr",
        type: inputType.editor,
        title: "Lyrics (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "lyrics_track_one_ar",
        type: inputType.editor,
        title: "Lyrics (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "instructions_en",
        type: inputType.editor,
        title: "Instructions (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "instructions_fr",
        type: inputType.editor,
        title: "Instructions (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "instructions_ar",
        type: inputType.editor,
        title: "Instructions (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "order_number",
        type: inputType.number,
        title: "Order number",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "media_link",
        type: inputType.image,
        title: "Image",
        placeholder: "",
        fullwidth: true,
        fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
        multiple: false,
        label: "Drag & Drop Image here or click to select image",
        fileOrFiles: "File", //Array or File or null
      },
    ]);
  } else if (id == 2) {
    //Interactive Stories
    setarray([
      {
        failed: "id",
        type: inputType.text,
        title: "id",
        placeholder: "",
        fullwidth: true,
        customdesign: { display: "none" },
      },
      CategoryAcitivities && {
        failed: "category_id",
        type: inputType.dropdown,
        title: "Category",
        placeholder: "",
        fullwidth: true,
        datadropdown: CategoryAcitivities,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      {
        failed: "title_en",
        type: inputType.text,
        title: "Title (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "title_fr",
          type: inputType.text,
          title: "Title (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "title_ar",
            type: inputType.text,
            title: "Title (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
      },

      Topics && {
        failed: "topic",
        type: inputType.multipleSelect,
        title: "Topics",
        placeholder: "",
        fullwidth: true,
        datadropdown: Topics,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },

      SubTopics && {
        failed: "sub_topic",
        type: inputType.multipleSelect,
        title: "Sub topics",
        placeholder: "",
        fullwidth: true,
        datadropdown: SubTopics,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      AgeRange && {
        failed: "agerange",
        type: inputType.multipleSelect,
        title: "Age range",
        placeholder: "",
        fullwidth: true,
        datadropdown: AgeRange,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      LevelOfDifficulty && {
        failed: "level_of_difficulty",
        type: inputType.multipleSelect,
        title: "Anything else",
        placeholder: "",
        fullwidth: true,
        datadropdown: LevelOfDifficulty,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      {
        failed: "video_link_en",
        type: inputType.text,
        title: "Video link (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "video_link_fr",
          type: inputType.text,
          title: "Video link (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "video_link_ar",
            type: inputType.text,
            title: "Video link (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
      },
      {
        failed: "prepare_en",
        type: inputType.editor,
        title: "Prepare (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "prepare_fr",
        type: inputType.editor,
        title: "Prepare (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "prepare_ar",
        type: inputType.editor,
        title: "Prepare (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "play_en",
        type: inputType.editor,
        title: "Play (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },

      {
        failed: "play_fr",
        type: inputType.editor,
        title: "Play (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "play_ar",
        type: inputType.editor,
        title: "Play (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "extend_en",
        type: inputType.editor,
        title: "Extend (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "extend_fr",
        type: inputType.editor,
        title: "Extend (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "extend_ar",
        type: inputType.editor,
        title: "Extend (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "order_number",
        type: inputType.number,
        title: "Order number",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "media_link",
        type: inputType.image,
        title: "Image",
        placeholder: "",
        fullwidth: true,
        fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
        multiple: false,
        label: "Drag & Drop Image here or click to select image",
        fileOrFiles: "File", //Array or File or null
      },
    ]);
  } else if (id == 3) {
    //Classroom Management
    setarray([
      {
        failed: "id",
        type: inputType.text,
        title: "id",
        placeholder: "",
        fullwidth: true,
        customdesign: { display: "none" },
      },
      CategoryAcitivities && {
        failed: "category_id",
        type: inputType.dropdown,
        title: "Category",
        placeholder: "",
        fullwidth: true,
        datadropdown: CategoryAcitivities,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      {
        failed: "title_en",
        type: inputType.text,
        title: "Title (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "title_fr",
          type: inputType.text,
          title: "Title (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "title_ar",
            type: inputType.text,
            title: "Title (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
      },
      Topics && {
        failed: "topic",
        type: inputType.multipleSelect,
        title: "Topics",
        placeholder: "",
        fullwidth: true,
        datadropdown: Topics,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },

      SubTopics && {
        failed: "sub_topic",
        type: inputType.multipleSelect,
        title: "Sub topics",
        placeholder: "",
        fullwidth: true,
        datadropdown: SubTopics,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      AgeRange && {
        failed: "agerange",
        type: inputType.multipleSelect,
        title: "Age range",
        placeholder: "",
        fullwidth: true,
        datadropdown: AgeRange,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      LevelOfDifficulty && {
        failed: "level_of_difficulty",
        type: inputType.multipleSelect,
        title: "Anything else",
        placeholder: "",
        fullwidth: true,
        datadropdown: LevelOfDifficulty,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      {
        failed: "video_link_en",
        type: inputType.text,
        title: "Video link (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "video_link_fr",
          type: inputType.text,
          title: "Video link (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "video_link_ar",
            type: inputType.text,
            title: "Video link (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
      },
      {
        failed: "description_en",
        type: inputType.editor,
        title: "Description (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "description_fr",
        type: inputType.editor,
        title: "Description (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "description_ar",
        type: inputType.editor,
        title: "Description (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "prepare_en",
        type: inputType.editor,
        title: "Prepare (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "prepare_fr",
        type: inputType.editor,
        title: "Prepare (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "prepare_ar",
        type: inputType.editor,
        title: "Prepare (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "tips_en",
        type: inputType.editor,
        title: "Tips (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },

      {
        failed: "tips_fr",
        type: inputType.editor,
        title: "Tips (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "tips_ar",
        type: inputType.editor,
        title: "Tips (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },

      {
        failed: "technique_en",
        type: inputType.editor,
        title: "Technique (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "technique_fr",
        type: inputType.editor,
        title: "Technique (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "technique_ar",
        type: inputType.editor,
        title: "Technique (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "extend_en",
        type: inputType.editor,
        title: "Extend (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "extend_fr",
        type: inputType.editor,
        title: "Extend (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "extend_ar",
        type: inputType.editor,
        title: "Extend (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "order_number",
        type: inputType.number,
        title: "Order number",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "media_link",
        type: inputType.image,
        title: "Image",
        placeholder: "",
        fullwidth: true,
        fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
        multiple: false,
        label: "Drag & Drop Image here or click to select image",
        fileOrFiles: "File", //Array or File or null
      },
    ]);
  } else if (id == 4) {
    //Games
    setarray([
      {
        failed: "id",
        type: inputType.text,
        title: "id",
        placeholder: "",
        fullwidth: true,
        customdesign: { display: "none" },
      },
      CategoryAcitivities && {
        failed: "category_id",
        type: inputType.dropdown,
        title: "Category",
        placeholder: "",
        fullwidth: true,
        datadropdown: CategoryAcitivities,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      {
        failed: "title_en",
        type: inputType.text,
        title: "Title (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "title_fr",
          type: inputType.text,
          title: "Title (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "title_ar",
            type: inputType.text,
            title: "Title (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
      },
      Topics && {
        failed: "topic",
        type: inputType.multipleSelect,
        title: "Topics",
        placeholder: "",
        fullwidth: true,
        datadropdown: Topics,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },

      SubTopics && {
        failed: "sub_topic",
        type: inputType.multipleSelect,
        title: "Sub topics",
        placeholder: "",
        fullwidth: true,
        datadropdown: SubTopics,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      AgeRange && {
        failed: "agerange",
        type: inputType.multipleSelect,
        title: "Age range",
        placeholder: "",
        fullwidth: true,
        datadropdown: AgeRange,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      LevelOfDifficulty && {
        failed: "level_of_difficulty",
        type: inputType.multipleSelect,
        title: "Anything else",
        placeholder: "",
        fullwidth: true,
        datadropdown: LevelOfDifficulty,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      {
        failed: "video_link_en",
        type: inputType.text,
        title: "Video link (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "video_link_fr",
          type: inputType.text,
          title: "Video link (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "video_link_ar",
            type: inputType.text,
            title: "Video link (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
      },
      {
        failed: "description_en",
        type: inputType.editor,
        title: "Description (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "description_fr",
        type: inputType.editor,
        title: "Description (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "description_ar",
        type: inputType.editor,
        title: "Description (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "prepare_en",
        type: inputType.editor,
        title: "Prepare (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "prepare_fr",
        type: inputType.editor,
        title: "Prepare (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "prepare_ar",
        type: inputType.editor,
        title: "Prepare (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "play_en",
        type: inputType.editor,
        title: "Play (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },

      {
        failed: "play_fr",
        type: inputType.editor,
        title: "Play (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "play_ar",
        type: inputType.editor,
        title: "Play (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },

      {
        failed: "extend_en",
        type: inputType.editor,
        title: "Extend (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "extend_fr",
        type: inputType.editor,
        title: "Extend (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "extend_ar",
        type: inputType.editor,
        title: "Extend (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },

      {
        failed: "limited_space_en",
        type: inputType.editor,
        title: "Limited space (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "limited_space_fr",
        type: inputType.editor,
        title: "Limited space (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "limited_space_ar",
        type: inputType.editor,
        title: "Limited space (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "order_number",
        type: inputType.number,
        title: "Order number",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "media_link",
        type: inputType.image,
        title: "Image",
        placeholder: "",
        fullwidth: true,
        fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
        multiple: false,
        label: "Drag & Drop Image here or click to select image",
        fileOrFiles: "File", //Array or File or null
      },
    ]);
  } else {
    // done
    setarray([
      {
        failed: "id",
        type: inputType.text,
        title: "id",
        placeholder: "",
        fullwidth: true,
        customdesign: { display: "none" },
      },
      CategoryAcitivities && {
        failed: "category_id",
        type: inputType.dropdown,
        title: "Category",
        placeholder: "",
        fullwidth: true,
        datadropdown: CategoryAcitivities,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      {
        failed: "title_en",
        type: inputType.text,
        title: "Title (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "title_fr",
          type: inputType.text,
          title: "Title (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "title_ar",
            type: inputType.text,
            title: "Title (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
      },
      Topics && {
        failed: "topic",
        type: inputType.multipleSelect,
        title: "Topics",
        placeholder: "",
        fullwidth: true,
        datadropdown: Topics,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },

      SubTopics && {
        failed: "sub_topic",
        type: inputType.multipleSelect,
        title: "Sub topics",
        placeholder: "",
        fullwidth: true,
        datadropdown: SubTopics,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      AgeRange && {
        failed: "agerange",
        type: inputType.multipleSelect,
        title: "Age range",
        placeholder: "",
        fullwidth: true,
        datadropdown: AgeRange,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      LevelOfDifficulty && {
        failed: "level_of_difficulty",
        type: inputType.multipleSelect,
        title: "Anything else",
        placeholder: "",
        fullwidth: true,
        datadropdown: LevelOfDifficulty,
        faileddropdown: {
          name: "title_en",
          value: "id",
        },
      },
      {
        failed: "video_link_en",
        type: inputType.text,
        title: "Video link (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
        child: {
          failed: "video_link_fr",
          type: inputType.text,
          title: "Video link (FR)",
          placeholder: "",
          fullwidth: true,
          customdesign: { width: "100%" },
          child: {
            failed: "video_link_ar",
            type: inputType.text,
            title: "Video link (AR)",
            placeholder: "",
            fullwidth: true,
            customdesign: { width: "100%" },
          },
        },
      },
      {
        failed: "description_en",
        type: inputType.editor,
        title: "Description (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "description_fr",
        type: inputType.editor,
        title: "Description (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "description_ar",
        type: inputType.editor,
        title: "Description (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "prepare_en",
        type: inputType.editor,
        title: "Prepare (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "prepare_fr",
        type: inputType.editor,
        title: "Prepare (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "prepare_ar",
        type: inputType.editor,
        title: "Prepare (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "play_en",
        type: inputType.editor,
        title: "Play (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },

      {
        failed: "play_fr",
        type: inputType.editor,
        title: "Play (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "play_ar",
        type: inputType.editor,
        title: "Play (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "extend_en",
        type: inputType.editor,
        title: "Extend (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "extend_fr",
        type: inputType.editor,
        title: "Extend (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "extend_ar",
        type: inputType.editor,
        title: "Extend (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },

      {
        failed: "limited_space_en",
        type: inputType.editor,
        title: "Limited space (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "limited_space_fr",
        type: inputType.editor,
        title: "Limited space (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "limited_space_ar",
        type: inputType.editor,
        title: "Limited space (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "tips_en",
        type: inputType.editor,
        title: "Tips (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },

      {
        failed: "tips_fr",
        type: inputType.editor,
        title: "Tips (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "tips_ar",
        type: inputType.editor,
        title: "Tips (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "technique_en",
        type: inputType.editor,
        title: "Technique (EN)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "technique_fr",
        type: inputType.editor,
        title: "Technique (FR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "technique_ar",
        type: inputType.editor,
        title: "Technique (AR)",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },
      {
        failed: "order_number",
        type: inputType.number,
        title: "Order number",
        placeholder: "",
        fullwidth: true,
        customdesign: { width: "100%" },
      },

      {
        failed: "media_link",
        type: inputType.image,
        title: "Image",
        placeholder: "",
        fullwidth: true,
        fileTypes: ["JPG", "PNG", "JPEG", "WEBP"],
        multiple: false,
        label: "Drag & Drop Image here or click to select image",
        fileOrFiles: "File", //Array or File or null
      },
    ]);
  }
  if (callback) {
    callback();
  }
};
