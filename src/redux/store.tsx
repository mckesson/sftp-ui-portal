import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import drawerReducer from "./Slices/drawerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    drawer: drawerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
