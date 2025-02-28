import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDrawerOpen: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
  },
});

export const { toggleDrawer, closeDrawer, openDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
