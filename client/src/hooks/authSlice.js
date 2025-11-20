import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token") || null;
const user = JSON.parse(localStorage.getItem("user")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token,
    user,
    isLoggedIn: !!token,
    isAdmin: user?.email === "patra6319@gmail.com" ? true : false
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.isAdmin = action.payload.user.email === "patra6319@gmail.com";

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      state.isAdmin = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logoutUser } = authSlice.actions;
export default authSlice.reducer;
