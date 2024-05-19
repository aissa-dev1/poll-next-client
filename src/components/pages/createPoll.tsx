import { Link } from "react-router-dom";
import Container from "../container";
import NavBar from "../navBar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { createPollSliceActions } from "@/features/create-poll";
import { Badge } from "../ui/badge";
import TrashIcon from "../icons/trashIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCreatePoll } from "@/hooks/use-create-poll";
import AuthPopUp from "../auth/authPopUp";
import { useRefreshLogin } from "@/hooks/use-refresh-login";
import { useTitle } from "@/hooks/use-title";
import { useCallback, useEffect } from "react";

const CreatePoll = () => {
  const createPollState = useAppSelector((state) => state.createPoll);
  const authUserState = useAppSelector((state) => state.authUser);
  const { refreshLogin } = useRefreshLogin();
  const { createPoll } = useCreatePoll();
  const dispatch = useAppDispatch();
  useTitle("Poll Next | Create Poll");

  const bootstrap = useCallback(async () => {
    await refreshLogin(authUserState.authToken);
  }, []);

  useEffect(() => {
    bootstrap();
    return () => {
      dispatch(createPollSliceActions.reset());
    };
  }, []);

  return (
    <>
      <NavBar title="Poll Next | Create Poll" />
      <Container className="mt-32">
        <div className="my-4">
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="question" className="w-fit">
                Question
              </Label>
              <Input
                id="question"
                type="text"
                placeholder="What color of the sky?"
                value={createPollState.question}
                onInput={(e) => {
                  dispatch(
                    createPollSliceActions.updateQuestion(e.currentTarget.value)
                  );
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category" className="w-fit">
                Category
              </Label>
              <Select
                value={createPollState.category}
                onValueChange={(e) => {
                  dispatch(createPollSliceActions.updateCategory(e));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="coding">Coding</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="options" className="w-fit">
              Options
            </Label>
            <div className="flex items-center gap-4">
              <Input
                className="w-full"
                id="options"
                type="text"
                placeholder="Answer 1"
                value={createPollState.option}
                onInput={(e) => {
                  dispatch(
                    createPollSliceActions.updateOption(e.currentTarget.value)
                  );
                }}
              />
              <Button
                onClick={() => {
                  dispatch(
                    createPollSliceActions.addOption(createPollState.option)
                  );
                }}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {createPollState.options.length > 0 ? (
              <>
                {createPollState.options.map((option, i) => (
                  <div
                    className="flex items-center gap-2"
                    key={`${option}-${i}`}
                  >
                    <Badge variant="outline" className="p-2">
                      {option}
                    </Badge>
                    <TrashIcon
                      onClick={() => {
                        dispatch(createPollSliceActions.removeOption(i));
                      }}
                    />
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm font-semibold">No option included yet!</p>
            )}
          </div>
          <div className="flex items-end justify-start">
            {authUserState.authenticated ? (
              <Button
                onClick={async () => {
                  await createPoll(
                    {
                      userId: authUserState._id,
                      question: createPollState.question,
                      category: createPollState.category,
                      options: createPollState.options,
                    },
                    authUserState.authToken
                  );
                }}
              >
                Create
              </Button>
            ) : (
              <AuthPopUp>
                <Button>Create</Button>
              </AuthPopUp>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default CreatePoll;
