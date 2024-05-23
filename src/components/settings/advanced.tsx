import { Label } from "../ui/label";
import ChangePasswordDialog from "./changePasswordDialog";
import DeleteAccountDialog from "./deleteAccountDialog";

const Advanced = () => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium">Advanced Settings</h3>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between gap-2">
          <Label>Change password</Label>
          <ChangePasswordDialog />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Label>Delete account</Label>
          <DeleteAccountDialog />
        </div>
      </div>
    </div>
  );
};

export default Advanced;
