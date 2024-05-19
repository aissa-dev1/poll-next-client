import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PollType, UserTypeWithPolls } from "./types";
import { storage } from "@/utils/storage";

type AuthUserState = UserTypeWithPolls & {
  authenticated: boolean;
  loading: boolean;
};

const initialState: AuthUserState = {
  authToken: storage.get("token") || "",
  _id: "",
  authenticated: false,
  email: "",
  fullName: "",
  avatar: "",
  bio: "",
  polls: [],
  loading: true,
};

const authUserSlice = createSlice({
  name: "auth-user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserTypeWithPolls>) {
      state.authToken = action.payload.authToken;
      storage.set("token", state.authToken);
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.avatar = action.payload.avatar;
      state.bio = action.payload.bio;
      state.polls = action.payload.polls;
      state.authenticated = true;
    },
    logout(state) {
      state.authToken = "";
      storage.set("token", state.authToken);
      state._id = "";
      state.email = "";
      state.fullName = "";
      state.avatar = "";
      state.bio = "";
      state.polls = [];
      state.authenticated = false;
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    updateAuthToken(state, action: PayloadAction<string>) {
      state.authToken = action.payload;
      storage.set("token", state.authToken);
    },
    updateFullName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
    updateBio(state, action: PayloadAction<string>) {
      state.bio = action.payload;
    },
    createPoll(state, action: PayloadAction<PollType>) {
      state.polls.push(action.payload);
    },
    deletePoll(state, action: PayloadAction<string>) {
      const poll = state.polls.find((p) => p._id === action.payload);
      if (!poll) return;
      const index = state.polls.indexOf(poll);
      state.polls.splice(index, 1);
    },
  },
});

export const authUserSliceActions = authUserSlice.actions;

export const authUserSliceReducer = authUserSlice.reducer;
