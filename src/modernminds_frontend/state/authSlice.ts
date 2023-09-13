import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  loginView: boolean;
  registerView: boolean;
  isLogedIn: boolean;
  resetPasswordRequest: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loginView: false,
  registerView: false,
  isLogedIn: false,
  resetPasswordRequest: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state) {
      state.isAuthenticated = true;
    },
    setLogoutState(state) {
      state.isAuthenticated = false;
    },
    setOpenLoginViewState(state) {
      state.loginView = true;
    },
    setCloseLoginViewState(state) {
      state.loginView = false;
    },
    setOpenRegisterViewState(state) {
      state.registerView = true;
    },
    setCloseRegisterViewState(state) {
      state.registerView = false;
    },
    setIsLogedIn(state) {
      state.isLogedIn = true;
    },
    setCloseIsLogedIn(state) {
      state.isLogedIn = false;
    },
    setOpenPasswordReset(state) {
      state.resetPasswordRequest = true;
    },
    setClosePasswordReset(state) {
      state.resetPasswordRequest = false;
    },
  },
});

export const {
  setAuthState,
  setLogoutState,
  setOpenLoginViewState,
  setCloseLoginViewState,
  setOpenRegisterViewState,
  setCloseRegisterViewState,
  setIsLogedIn,
  setCloseIsLogedIn,
  setOpenPasswordReset,
  setClosePasswordReset,
} = authSlice.actions;

export default authSlice.reducer;
