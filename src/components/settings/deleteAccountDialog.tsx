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
import { useDeleteAccount } from "@/hooks/use-delete-account";
import { useState } from "react";
import Loader from "../loader";

const DeleteAccountDialog = () => {
  const [password, setPassword] = useState("");
  const { deleteAccount, loading } = useDeleteAccount();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button variant="destructive">Delete</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Your Poll Next Account</DialogTitle>
          <DialogDescription>
            You can't cancel this operation after you hit 'confirm'
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="w-fit">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="@pass@word"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Button
            onClick={async () => {
              await deleteAccount({ password });
            }}
          >
            {loading ? <Loader /> : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
