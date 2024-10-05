import Cookies from "js-cookie";
import { RouterName } from "src/routes/RouterName";
import { Autologin } from "src/store/data/user/actionsUser";
import { setUserInfo } from "src/store/data/user/reducerUser";
import UrlApi from "src/utils/Url";
import { GetFunction, PostFunction } from "src/utils/axios_connection";

export let isDevelopmentMode =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const getLinkPagination = ({
  page = "",
  rowsPerPage = "",
  orderBy = "",
  typeOrder = "",
  search = "",
  fieldsSearch = "",
}) => {
  let quary;
  if (page != null && page != "null") {
    quary = `offset=${page}`;
  }
  if (rowsPerPage != null && rowsPerPage != "null") {
    quary = quary + `&page_size=${rowsPerPage}`;
  }
  if (orderBy && orderBy != "null") {
    quary = quary + `&sortField=${orderBy}`;
  }
  if (typeOrder && typeOrder != "null") {
    quary = quary + `&order=${typeOrder}`;
  }
  if (search && search != "null") {
    quary = quary + `&search=${search}`;
  }
  if (fieldsSearch && fieldsSearch != "null" && isValidArray(fieldsSearch)) {
    quary = quary + `&fieldsSearch=${JSON.stringify(fieldsSearch)}`;
  }
  return quary;
};

export const dataLocalStorage = {
  userinfo: "user",
  privileges: "privileges",
  loading_check_user: "loading_check_user",
};
export const columntype = {
  text: "text",
  image: "image",
  status: "status",
  date: "date",
  time: "time",
  action: "action",
  switch: "switch",
  checkbox: "checkbox",
  dateAndtime: "dateAndtime",
  html: "html",
};

export const inputType = {
  title: "title",
  text: "text",
  number: "number",
  password: "password",
  phonenumber: "phonenumber",
  textarea: "textarea",
  email: "email",
  image: "image",
  dropdown: "dropdown",
  dropdownSearch: "dropdownSearch",
  multipleSelect: "multipleSelect",
  date: "date",
  time: "time",
  dateandtime: "dateandtime",
  action: "action",
  cancel: "cancel",
  checkbox: "checkbox",
  editor: "editor",
  map: "map",
  color: "color",
};
export const media_app = {
  slidershow: {
    name: "slidershow",
  },
  press_blog_news: {
    our_story: "our_story",
    impact: "impact",
  },
};

export const printData = ({ name, data, type }) => {
  if (isDevelopmentMode) {
    if (type == "error") {
      console.error({ [name]: data });
    } else {
      // console.log({ [name]: data });
    }
  } else {
    return;
  }
};

export const saveLocalStorage = (key, data) => {
  localStorage.setItem([key], JSON.stringify(data));
};
export const saveSessionStorage = (key, data) => {
  sessionStorage.setItem([key], JSON.stringify(data));
};

export const getLocalStorage = (key) => {
  let data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return "";
  }
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const removeAllLocalStorage = () => {
  localStorage.clear();
};

export const saveCookie = (key, data, expires) => {
  if (expires) {
    Cookies.set(key, data, { expires: expires });
  } else {
    Cookies.set(key, data);
  }
};

export const getCookie = async (key) => {
  return Cookies.get(key);
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};

export const CheckItemIfExit = (value, array, failedname = "id") => {
  let isExit = array?.some((element) => element[failedname] == value);
  return isExit;
};

export const removeItemFromArray = (id, array) => {
  let newArray = array?.filter((item) => item?.id !== id);
  return newArray;
};
export const getItemFromArray = (id, array) => {
  let newArray = array?.filter((item) => item?.id == id);
  return newArray[0];
};
export const AddItemToArray = (item, array) => {
  return [...array, item];
};
export const editItemInArray = (editedItem, array) => {
  const newArray = array.map((item) => {
    if (item.id === editedItem.id) {
      return { ...item, ...editedItem }; // Replace the item with the edited item
    }
    return item;
  });
  return newArray;
  // how can i used it
  //  let updatedArray = editItemInArray(
  //    {
  //      id: olditem.id,
  //      quantity: parseInt(olditem.quantity) + parseInt(item.quantity),
  //    },
  //    allCard
  //  );
};

export const ChackImageIsFile = ({ data, IsBoolean }) => {
  if (data instanceof Blob || data instanceof File) {
    const objectURL = URL.createObjectURL(data);
    if (IsBoolean) {
      return true;
    } else {
      return objectURL;
    }
  } else {
    if (IsBoolean) {
      return false;
    } else {
      if (data.startsWith("http")) {
        return data;
      } else {
        return UrlApi.baseUrlImage + data;
      }
    }
  }
};

export const CheckTypeFile = ({ name }) => {
  let type = name?.split(".")?.pop();
  if (
    type === "mp4" ||
    type === "mov" ||
    type === "webm" ||
    type === "avi" ||
    type === "wmv" ||
    type === "flv"
  ) {
    return "video";
  } else if (
    type === "jpg" ||
    type === "jpeg" ||
    type === "png" ||
    type === "gif"
  ) {
    return "image";
  } else if (
    type === "mp3" ||
    type === "wav" ||
    type === "ogg" ||
    type === "aac" ||
    type === "flac"
  ) {
    return "audio";
  } else {
    return "unknown";
  }
};

export function isEquivalent(a, b) {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch (e) {
    return false;
  }
}
export function isValidArray(array) {
  return array && Array.isArray(array) && array.length > 0;
}

export function validURL(str) {
  const regexp =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}

export function isNumber(data) {
  if (isNaN(data)) {
    return false;
  } else {
    return true;
  }
}
export const CheckDataIfExit = (data) => {
  if (
    data == "<p><br></p>" ||
    data == `<p class="ql-align-right ql-direction-rtl"><br></p>`
  ) {
    return false;
  } else {
    if ((data != null && data != undefined) || data == 0) {
      return true;
    } else {
      return false;
    }
  }
};

export const Checkuser = ({ dispatch, navigate }) => {
  saveLocalStorage(dataLocalStorage.loading_check_user, true);
  const data = getLocalStorage(dataLocalStorage.userinfo);
  dispatch(setUserInfo(data));

  if (data?.token) {
    dispatch(
      Autologin({
        callback: () => {
          saveLocalStorage(dataLocalStorage.loading_check_user, false);
        },
      })
    );
    if (
      window.location.pathname == "/auth/login" ||
      window.location.pathname == "/auth/forgot-password" ||
      window.location.pathname.includes("/auth/reset-password")
    ) {
      navigate(RouterName.home.home);
    }
  } else {
    if (
      window.location.pathname != "/auth/login" &&
      window.location.pathname != "/auth/forgot-password" &&
      !window.location.pathname.includes("/auth/reset-password")
    ) {
      navigate(RouterName.auth.login);
    }
    saveLocalStorage(dataLocalStorage.loading_check_user, false);
  }
};

export const reOrderItem =
  ({ callback, tableName, oldOrderNumber, newOrderNumber, item_id }) =>
  async (dispatch, getState) => {
    {
      try {
        let link = UrlApi.reOrder;
        const response = await PostFunction({
          data: { tableName, oldOrderNumber, newOrderNumber, item_id },
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
    }
  };
