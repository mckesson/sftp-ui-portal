import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  role: string;
};

const initialState: UserState = {
  role: "System Administrator",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    switchRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
  },
});

export const { switchRole } = userSlice.actions;

export const selectRole = (state: { user: UserState }) => state.user.role;

export default userSlice.reducer;
