import { PollType } from "@/features/types";
import ShowPoll, { PollSkeleton } from "./showPoll";

interface PollsProps {
  polls: PollType[];
}

export const PollsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {["skeleton1", "skeleton2", "skeleton3", "skeleton4", "skeleton5"].map(
        (skeleton) => (
          <PollSkeleton key={skeleton} />
        )
      )}
    </div>
  );
};

const Polls = ({ polls }: PollsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {polls.map((poll) => (
        <ShowPoll key={poll._id} {...poll} />
      ))}
    </div>
  );
};

export default Polls;
