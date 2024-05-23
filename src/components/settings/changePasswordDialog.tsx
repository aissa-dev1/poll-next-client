import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useChangePassword } from "@/hooks/use-change-password";
import Loader from "../loader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changePasswordSliceActions } from "@/features/change-password";

const ChangePasswordDialog = () => {
  const changePasswordState = useAppSelector((state) => state.changePassword);
  const dispatch = useAppDispatch();
  const { changePassword, passwordLoading } = useChangePassword();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button>Change</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Here you can update your account password and keep it strong and
            safe.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="current_password" className="w-fit">
              Current Password
            </Label>
            <Input
              id="current_password"
              type="password"
              placeholder="@pass@word"
              value={changePasswordState.currentPassword}
              onChange={(e) => {
                dispatch(
                  changePasswordSliceActions.updateCurrentPassword(
                    e.target.value
                  )
                );
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="new_password" className="w-fit">
              New Password
            </Label>
            <Input
              id="new_password"
              type="password"
              placeholder="@pass1@word2"
              value={changePasswordState.newPassword}
              onChange={(e) => {
                dispatch(
                  changePasswordSliceActions.updateNewPassword(e.target.value)
                );
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="rnew_password" className="w-fit">
              r-enter New Password
            </Label>
            <Input
              id="rnew_password"
              type="password"
              placeholder="@pass1@word2"
              value={changePasswordState.rnewPassword}
              onChange={(e) => {
                dispatch(
                  changePasswordSliceActions.updateRnewPassword(e.target.value)
                );
              }}
            />
          </div>
          <Button
            onClick={async () => {
              await changePassword({
                currentPassword: changePasswordState.currentPassword,
                newPassword: changePasswordState.newPassword,
                rnewPassword: changePasswordState.rnewPassword,
              });
            }}
          >
            {passwordLoading ? <Loader /> : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
