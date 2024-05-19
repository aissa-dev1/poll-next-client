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
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { loginSliceActions } from "@/features/login";
import { useLogin } from "@/hooks/use-login";
import NavBar from "../navBar";

const Login = () => {
  const loginState = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const { login } = useLogin();
  useTitle("Poll Next | Login");

  useEffect(() => {
    return () => {
      dispatch(loginSliceActions.reset());
    };
  }, []);

  return (
    <>
      <NavBar title="Poll Next | Login" excludeDropDown />
      <Container className="absolute flex flex-col gap-2 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <div className="flex items-center justify-between">
          <Badge className="cursor-pointer">Login</Badge>
          <Link to="/register">
            <Badge variant="outline">Create account</Badge>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Welcome back!</CardTitle>
            <CardDescription>
              We were eagerly awaiting your return.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="w-fit">
                Email
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="youraddress@mail.com"
                value={loginState.email}
                onInput={(e) => {
                  dispatch(
                    loginSliceActions.updateEmail(e.currentTarget.value)
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
                value={loginState.password}
                onInput={(e) => {
                  dispatch(
                    loginSliceActions.updatePassword(e.currentTarget.value)
                  );
                }}
              />
            </div>
            <div className="flex flex-col-reverse gap-2 md:grid md:grid-cols-2 md:gap-4">
              <Link to="/">
                <Button className="w-full" variant="outline">
                  Home
                </Button>
              </Link>
              <Button
                onClick={async () => {
                  await login({
                    email: loginState.email,
                    password: loginState.password,
                  });
                }}
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Login;
