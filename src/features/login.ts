import { LoginData } from "@/api/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthStatus } from "./types";

type LoginState = LoginData & {
  status: AuthStatus;
};

const initialState: LoginState = {
  email: "",
  password: "",
  status: "pending",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    updatePassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    loginCompleted(state) {
      state.status = "completed";
    },
    reset(state) {
      state.email = "";
      state.password = "";
      state.status = "pending";
    },
  },
});

export const loginSliceActions = loginSlice.actions;

export const loginSliceReducer = loginSlice.reducer;
