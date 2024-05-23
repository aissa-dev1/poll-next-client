import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAppSelector } from "@/hooks/redux";
import { useChangeName } from "@/hooks/use-change-name";
import Loader from "../loader";
import { userAvatarsData } from "@/data";
import classnames from "classnames";
import { useChangeAvatar } from "@/hooks/use-change-avatar";
import { useChangeBio } from "@/hooks/use-change-bio";

const Account = () => {
  const authUserState = useAppSelector((state) => state.authUser);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const { changeName, nameLoading } = useChangeName();
  const { changeAvatar, avatarLoading } = useChangeAvatar();
  const { changeBio, bioLoading } = useChangeBio();

  useEffect(() => {
    setFullName(authUserState.fullName);
    setBio(authUserState.bio);
  }, [authUserState]);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium">Account Settings</h3>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center gap-2">
          <Label htmlFor="fullName" className="shrink-0">
            Change Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="your new name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Button
            onClick={async () => {
              await changeName(fullName);
            }}
          >
            {nameLoading ? <Loader /> : "Save"}
          </Button>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Label className="shrink-0">Avatar</Label>
          {avatarLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap items-center gap-4">
              {userAvatarsData.map((avatar) => {
                return (
                  <div
                    className={classnames(
                      "flex items-center justify-center w-10 h-10 border rounded-full border-secondary",
                      {
                        "bg-purple-500/15":
                          authUserState.avatar === avatar.code,
                      }
                    )}
                    key={avatar.id}
                  >
                    <img
                      className="w-8 cursor-pointer"
                      src={avatar.src}
                      alt={avatar.code}
                      onClick={async () => {
                        await changeAvatar(avatar.code);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="bio" className="shrink-0">
            Change Your bio
          </Label>
          <Input
            id="bio"
            type="text"
            placeholder="Hello I am a good person"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <Button
            onClick={async () => {
              await changeBio(bio);
            }}
          >
            {bioLoading ? <Loader /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
