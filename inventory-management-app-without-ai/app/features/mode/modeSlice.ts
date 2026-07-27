import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModeState {
  darkMode: boolean;
  sideBarCollapse: boolean;
}

const initialState: ModeState = {
  darkMode: false,
  sideBarCollapse: false,
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
    setSidebarCollapse(state, action: PayloadAction<boolean>) {
      state.sideBarCollapse = action.payload;
    },
  },
});

export const { setMode, setSidebarCollapse } = modeSlice.actions;
export default modeSlice.reducer;
