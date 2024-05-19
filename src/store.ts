import { configureStore } from "@reduxjs/toolkit";
import { pollsSliceReducer } from "./features/polls";
import { authUserSliceReducer } from "./features/auth-user";
import { registerSliceReducer } from "./features/register";
import { loginSliceReducer } from "./features/login";
import { pollSliceReducer } from "./features/poll";
import { profileSliceReducer } from "./features/profile";
import { createPollSliceReducer } from "./features/create-poll";

export const store = configureStore({
  reducer: {
    polls: pollsSliceReducer,
    authUser: authUserSliceReducer,
    register: registerSliceReducer,
    login: loginSliceReducer,
    poll: pollSliceReducer,
    profile: profileSliceReducer,
    createPoll: createPollSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
