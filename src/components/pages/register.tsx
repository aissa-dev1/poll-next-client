import { useTitle } from "@/hooks/use-title";
import Container from "../container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { registerSliceActions } from "@/features/register";
import { useEffect } from "react";
import { useRegister } from "@/hooks/use-register";
import NavBar from "../navBar";

const Register = () => {
  const registerState = useAppSelector((state) => state.register);
  const dispatch = useAppDispatch();
  const { register } = useRegister();

  useEffect(() => {
    return () => {
      dispatch(registerSliceActions.reset());
    };
  }, []);

  useTitle("Poll Next | Create Account");

  return (
    <>
      <NavBar title="Poll Next | Create Account" excludeDropDown />
      <Container className="absolute flex flex-col gap-2 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <div className="flex items-center justify-between">
          <Link to="/login">
            <Badge variant="outline">Login</Badge>
          </Link>
          <Badge className="cursor-pointer">Create account</Badge>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Join us today!</CardTitle>
            <CardDescription>
              We were looking for people like you to join.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="w-fit">
                Email
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="youraddress@mail.com"
                value={registerState.email}
                onInput={(e) => {
                  dispatch(
                    registerSliceActions.updateEmail(e.currentTarget.value)
                  );
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="w-fit">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="@pass@word"
                value={registerState.password}
                onInput={(e) => {
                  dispatch(
                    registerSliceActions.updatePassword(e.currentTarget.value)
                  );
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName" className="w-fit">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Some One"
                value={registerState.fullName}
                onInput={(e) => {
                  dispatch(
                    registerSliceActions.updateFullName(e.currentTarget.value)
                  );
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Label>Agree to our terms & privacy</Label>
              <Switch
                checked={registerState.termsAgree}
                onClick={() => {
                  dispatch(registerSliceActions.toggleTermsAgree());
                }}
              />
            </div>
          </CardContent>
          <CardContent className="flex flex-col-reverse gap-2 md:grid md:grid-cols-2 md:gap-4">
            <Link to="/">
              <Button className="w-full" variant="outline">
                Home
              </Button>
            </Link>
            <Button
              variant={registerState.termsAgree ? "default" : "secondary"}
              onClick={async () => {
                await register({
                  email: registerState.email,
                  password: registerState.password,
                  fullName: registerState.fullName,
                });
              }}
            >
              Join
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Register;
