import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PollType } from "./types";

type PollsState = {
  list: PollType[];
  loading: boolean;
  allowFetch: boolean;
};

const initialState: PollsState = {
  list: [],
  loading: false,
  allowFetch: true,
};

const pollsSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    updatePolls(state, action: PayloadAction<PollType[]>) {
      state.list = action.payload;
    },
    enableFetch(state) {
      state.allowFetch = true;
    },
    disableFetch(state) {
      state.allowFetch = false;
    },
  },
});

export const pollsSliceActions = pollsSlice.actions;

export const pollsSliceReducer = pollsSlice.reducer;
