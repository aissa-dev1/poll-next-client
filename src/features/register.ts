import { RegisterData } from "@/api/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthStatus } from "./types";

type RegisterState = RegisterData & {
  termsAgree: boolean;
  status: AuthStatus;
};

const initialState: RegisterState = {
  email: "",
  password: "",
  fullName: "",
  termsAgree: false,
  status: "pending",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    updatePassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    updateFullName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
    toggleTermsAgree(state) {
      state.termsAgree = !state.termsAgree;
    },
    registerCompleted(state) {
      state.status = "completed";
    },
    reset(state) {
      state.email = "";
      state.password = "";
      state.fullName = "";
      state.termsAgree = false;
      state.status = "pending";
    },
  },
});

export const registerSliceActions = registerSlice.actions;

export const registerSliceReducer = registerSlice.reducer;
