import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { generalSettingsSliceActions } from "@/features/general-settings";

const General = () => {
  const generalSettingsState = useAppSelector((state) => state.generalSettings);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium">General Settings</h3>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between gap-2">
          <Label>Show usage guide card in home page</Label>
          <Switch
            checked={generalSettingsState.showUsageGuideCard}
            onClick={() => {
              dispatch(generalSettingsSliceActions.toggleShowUsageGuideCard());
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default General;
