import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type changePasswordState = {
  currentPassword: string;
  newPassword: string;
  rnewPassword: string;
};

const initialState: changePasswordState = {
  currentPassword: "",
  newPassword: "",
  rnewPassword: "",
};

const changePasswordSlice = createSlice({
  name: "change-password",
  initialState,
  reducers: {
    updateCurrentPassword(state, action: PayloadAction<string>) {
      state.currentPassword = action.payload;
    },
    updateNewPassword(state, action: PayloadAction<string>) {
      state.newPassword = action.payload;
    },
    updateRnewPassword(state, action: PayloadAction<string>) {
      state.rnewPassword = action.payload;
    },
    reset(state) {
      state.currentPassword = "";
      state.newPassword = "";
      state.rnewPassword = "";
    },
  },
});

export const changePasswordSliceActions = changePasswordSlice.actions;

export const changePasswordSliceReducer = changePasswordSlice.reducer;
