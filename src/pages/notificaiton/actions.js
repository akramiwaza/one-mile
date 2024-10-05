import {
  ChackImageIsFile,
  CheckDataIfExit,
  CheckTypeFile,
  getLinkPagination,
} from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const SendNotification =
  ({ callback, values }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var bodyFormData = new FormData();
      bodyFormData.append("title", values?.title);
      bodyFormData.append("description", values?.description);
      bodyFormData.append("topic_name", values?.topic_name);
      if (
        values?.image &&
        values?.image != null &&
        values?.image != undefined &&
        ChackImageIsFile({ data: values?.image, IsBoolean: true })
      ) {
        bodyFormData.append("image", values?.image);
      } else if (!values?.image) {
        bodyFormData.append("image", "");
      }
      const response = await PostFunction({
        data: bodyFormData,
        Route: UrlApi.notification.sendbroadcastnotifcation,
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
