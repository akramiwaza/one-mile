import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  email: "",
  fullname: "",
  main_img: null,
  phone: "",
  token: "",
  user_type_id: 0,
  username: "",
  dataPrivileges: [],
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action?.payload?.id;
      state.email = action?.payload?.email;
      state.fullname = action?.payload?.fullname;
      state.main_img = action?.payload?.main_img;
      state.phone = action?.payload?.phone;
      state.token = action?.payload?.token;
      state.user_type_id = action?.payload?.user_type_id;
      state.username = action?.payload?.username;
    },
    removeUserInfo: (state, action) => {
      state.id = 0;
      state.email = "";
      state.fullname = "";
      state.main_img = "";
      state.phone = "";
      state.token = "";
      state.user_type_id = 0;
      state.username = "";
    },
    setDataPrivileges: (state, action) => {
      state.dataPrivileges = action.payload;
    },
  },
});

export const { setUserInfo, setDataPrivileges, removeUserInfo } =
  UserSlice.actions;

export default UserSlice.reducer;
