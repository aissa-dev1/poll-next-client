import { storage } from "@/utils/storage";
import { createSlice } from "@reduxjs/toolkit";

type GeneralSettingsState = {
  showUsageGuideCard: boolean;
};

const initialState: GeneralSettingsState = storage.get("general-settings") || {
  showUsageGuideCard: true,
};

const generalSettingsSlice = createSlice({
  name: "general-settings",
  initialState,
  reducers: {
    toggleShowUsageGuideCard(state) {
      state.showUsageGuideCard = !state.showUsageGuideCard;
      storage.set("general-settings", JSON.parse(JSON.stringify(state)));
    },
  },
});

export const generalSettingsSliceActions = generalSettingsSlice.actions;

export const generalSettingsSliceReducer = generalSettingsSlice.reducer;
