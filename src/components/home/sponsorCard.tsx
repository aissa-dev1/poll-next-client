import { Card } from "../ui/card";

const SponsorCard = () => {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 p-6 bg-gradient-to-r from-blue-700/5 to-purple-700/15">
      <h3 className="text-sm font-bold lg:text-xl">
        Thanks to Aissa Bedr for Sponsoring
      </h3>
    </Card>
  );
};

export default SponsorCard;
