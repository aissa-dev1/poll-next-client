import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";

const AuthReminderCard = () => {
  return (
    <Card className="flex flex-col gap-4 p-6 bg-gradient-to-r from-blue-700/5 to-purple-700/15">
      <CardTitle>Join our family today!</CardTitle>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <CardDescription>You do have an account?</CardDescription>
          <Link to="/login">
            <Button className="w-full">Login</Button>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <CardDescription>You don't have an account?</CardDescription>
          <Link to="/register">
            <Button variant="outline" className="w-full">
              Create account
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default AuthReminderCard;
