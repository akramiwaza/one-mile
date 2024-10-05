import { toast } from "react-toastify";
import {
  dataLocalStorage,
  getLocalStorage,
  isDevelopmentMode,
  printData,
} from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { Logout } from "src/store/data/user/actionsUser";
import axios from "src/utils/axios";

export async function GetFunction({
  Route,
  data,
  showalert,
  state,
  tokens,
  dispatch,
}) {
  try {
    const dataUser = getLocalStorage(dataLocalStorage.userinfo);

    let token;
    if (dataUser || tokens) {
      if (tokens) {
        token = tokens;
      } else {
        token = dataUser?.token ?? "";
      }
    }
    printData({
      name: "This data send to " + Route + " :===>",
      data,
      type: "api",
    });
    const res = await axios.get(
      Route,
      {
        headers: {
          token: token,
        },
      },
      { params: data }
    );
    if (res) {
      if (showalert) {
        toast.success(res?.data?.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      printData({
        name: "This response from " + Route + " <===:",
        data: res?.data,
        type: "api",
      });

      if (res?.data) {
        return res.data;
      } else if (res) {
        return res;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } catch (err) {
    toast.error(err?.response?.data?.message ?? err.message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(setLoading(false));
    if (err?.response?.status == 401) {
      dispatch(Logout({ navigate: null }));
    }
    throw new Error(err?.response?.data?.message ?? err.message);
  }
}

export async function PostFunction({
  Route,
  data,
  showalert,
  isMultipart = true,
  state,
  dispatch,
}) {
  try {
    const dataUser = await getLocalStorage(dataLocalStorage.userinfo);
    let token;
    if (dataUser) {
      token = dataUser?.token ?? "";
    }
    printData({
      name: "This data send to " + Route + " :===>",
      data,
      type: "api",
    });

    let header;
    if (isMultipart) {
      header = {
        method: "post",
        url: Route,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
          token: token,
        },
      };
    } else {
      header = {
        method: "post",
        url: Route,
        data: data,
        headers: {
          token: token,
        },
      };
    }
    const res = await axios(header);
    if (res) {
      if (showalert) {
        toast.success(res?.data?.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      printData({
        name: "This response from " + Route + " <===:",
        data: res?.data,
        type: "api",
      });

      if (res?.data) {
        return res.data;
      } else if (res) {
        return res;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } catch (err) {
    toast.error(err?.response?.data?.message ?? err.message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(setLoading(false));
    if (err?.response?.status == 401) {
      dispatch(Logout({ navigate: null }));
    }
    throw new Error(err?.response?.data?.message ?? err.message);
  }
}
