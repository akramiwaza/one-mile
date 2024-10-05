import UrlApi from "src/utils/Url";
import { PostFunction } from "src/utils/axios_connection";

export const viewed_key = {
  topic: "topic",
  activity: "activity",
  activity_category: "activity_category",
  flash_card_used: "flash_card_used",
  flash_card_viewed: "flash_card_viewed",
};

export const GetTotalUserApi =
  ({ callback }) =>
  async (dispatch, getState) => {
    try {
      let link = UrlApi.dashboard.active_users;
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

export const GetDataApi =
  ({ callback, from, to, type }) =>
  async (dispatch, getState) => {
    try {
      if (from && to && type) {
        let link;
        if (type == viewed_key.topic) {
          link = UrlApi.dashboard.topic;
        } else if (type == viewed_key.activity) {
          link = UrlApi.dashboard.activity;
        } else if (type == viewed_key.activity_category) {
          link = UrlApi.dashboard.cateogry;
        } else if (type == viewed_key.flash_card_used) {
          link = UrlApi.dashboard.flash_card_used;
        } else if (type == viewed_key.flash_card_viewed) {
          link = UrlApi.dashboard.flash_card_viewed;
        }
        const response = await PostFunction({
          data: { from, to },
          Route: link,
          showalert: false,
          state: getState,
          isMultipart: false,
          dispatch: dispatch,
        });
        callback(response);
      }
    } catch (err) {
      callback(false);
    }
  };
