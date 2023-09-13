import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
  storageInitiated: boolean;
  isExploreOpen: boolean;
}

const initialState: GlobalState = {
  storageInitiated: false,
  isExploreOpen: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setInit: (state) => {
      state.storageInitiated = true;
    },
    setExploreOpen(state) {
      state.isExploreOpen = true;
    },
    setExploreClose(state) {
      state.isExploreOpen = false;
    },
  },
});

export const { setInit, setExploreOpen, setExploreClose } = globalSlice.actions;

export default globalSlice.reducer;
