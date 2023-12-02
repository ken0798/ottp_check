import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("TOKEN") || null,
  user: null,
  viewLogin: false,
  pic: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    toggleLogin(state) {
      state.viewLogin = !state.viewLogin;
    },
    setPic(state, action) {
      state.pic = action.payload;
    },
    removeToken(state) {
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setUser, toggleLogin, setPic, removeToken } =
  authSlice.actions;

export default authSlice.reducer;
