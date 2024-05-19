import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserTypeWithPolls } from "./types";

type ProfileState = Omit<UserTypeWithPolls, "authToken"> & {
  loading: boolean;
};

const initialState: ProfileState = {
  _id: "",
  email: "",
  fullName: "",
  avatar: "",
  bio: "",
  polls: [],
  loading: true,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    update(state, action: PayloadAction<UserTypeWithPolls>) {
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.avatar = action.payload.avatar;
      state.bio = action.payload.bio;
      state.polls = action.payload.polls;
    },
    reset(state) {
      state._id = "";
      state.email = "";
      state.fullName = "";
      state.avatar = "";
      state.bio = "";
      state.polls = [];
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
  },
});

export const profileSliceActions = profileSlice.actions;

export const profileSliceReducer = profileSlice.reducer;
