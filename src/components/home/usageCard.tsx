import { usageCardData } from "@/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type UsageCardItem = {
  id: string;
  title: string;
  description: string;
};

const UsageCard = () => {
  return (
    <Card className="flex flex-col gap-4 bg-gradient-to-r from-blue-700/5 to-purple-700/15">
      <CardHeader>
        <CardTitle>Usage guide</CardTitle>
        <CardDescription>
          Here is a some instructions that can guide you to use this app (you
          can hide this card from settings)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {usageCardData.map((item) => {
            return (
              <AccordionItem value={item.id} key={item.id}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.description}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default UsageCard;
