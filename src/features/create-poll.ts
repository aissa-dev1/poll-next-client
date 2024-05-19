import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthStatus } from "./types";

type CreatePollState = {
  question: string;
  category: string;
  option: string;
  options: string[];
  status: AuthStatus;
};

const initialState: CreatePollState = {
  question: "",
  category: "any",
  option: "",
  options: [],
  status: "pending",
};

const createPollSlice = createSlice({
  name: "create-poll",
  initialState,
  reducers: {
    updateQuestion(state, action: PayloadAction<string>) {
      state.question = action.payload;
    },
    updateCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    updateOption(state, action: PayloadAction<string>) {
      state.option = action.payload;
    },
    addOption(state, action: PayloadAction<string>) {
      if (!state.option || state.options.length >= 10) return;
      state.options.push(action.payload);
      state.option = "";
    },
    removeOption(state, action: PayloadAction<number>) {
      state.options.splice(action.payload, 1);
    },
    statusCompleted(state) {
      state.status = "completed";
    },
    reset(state) {
      state.question = "";
      state.category = "any";
      state.option = "";
      state.options = [];
      state.status = "pending";
    },
  },
});

export const createPollSliceActions = createPollSlice.actions;

export const createPollSliceReducer = createPollSlice.reducer;
