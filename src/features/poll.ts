import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PollOptionVotePayload, PollType } from "./types";

type PollState = PollType & {
  loading: boolean;
};

const initialState: PollState = {
  _id: "",
  userId: "",
  question: "",
  category: "",
  options: [],
  likes: [],
  loading: false,
};

const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    update(state, action: PayloadAction<PollType>) {
      state._id = action.payload._id;
      state.userId = action.payload.userId;
      state.question = action.payload.question;
      state.category = action.payload.category;
      state.options = action.payload.options;
      state.likes = action.payload.likes;
    },
    voteOption(state, action: PayloadAction<PollOptionVotePayload>) {
      for (const option of state.options) {
        if (option.voters.includes(action.payload.fanId)) return;
      }
      state.options[action.payload.index].voters.push(action.payload.fanId);
    },
    toggleLike(state, action: PayloadAction<string>) {
      if (!state.likes.includes(action.payload)) {
        state.likes = [...state.likes, action.payload];
        return;
      }

      const index = state.likes.indexOf(action.payload);
      state.likes.splice(index, 1);
    },
  },
});

export const pollSliceActions = pollSlice.actions;

export const pollSliceReducer = pollSlice.reducer;
