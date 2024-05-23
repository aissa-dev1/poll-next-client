import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Loader from "../loader";
import { useDeletePoll } from "@/hooks/use-delete-poll";
import { useAppSelector } from "@/hooks/redux";

const DeletePollDialog = () => {
  const pollState = useAppSelector((state) => state.poll);
  const { deletePoll, deleteLoading } = useDeletePoll();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button variant="destructive">Delete</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete This Poll</DialogTitle>
          <DialogDescription>
            You can't cancel this operation after you hit 'confirm'
          </DialogDescription>
        </DialogHeader>

        <Button
          onClick={async () => {
            await deletePoll(pollState._id);
          }}
        >
          {deleteLoading ? <Loader /> : "Confirm"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePollDialog;
