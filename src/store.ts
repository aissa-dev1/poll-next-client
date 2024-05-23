import { configureStore } from "@reduxjs/toolkit";
import { pollsSliceReducer } from "./features/polls";
import { authUserSliceReducer } from "./features/auth-user";
import { registerSliceReducer } from "./features/register";
import { loginSliceReducer } from "./features/login";
import { pollSliceReducer } from "./features/poll";
import { profileSliceReducer } from "./features/profile";
import { createPollSliceReducer } from "./features/create-poll";
import { generalSettingsSliceReducer } from "./features/general-settings";
import { changePasswordSliceReducer } from "./features/change-password";

export const store = configureStore({
  reducer: {
    polls: pollsSliceReducer,
    authUser: authUserSliceReducer,
    register: registerSliceReducer,
    login: loginSliceReducer,
    poll: pollSliceReducer,
    profile: profileSliceReducer,
    createPoll: createPollSliceReducer,
    generalSettings: generalSettingsSliceReducer,
    changePassword: changePasswordSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
