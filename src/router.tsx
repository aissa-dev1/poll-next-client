import { Route, Routes } from "react-router";
import App from "./App";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import NotFound from "./components/pages/notFound";
import Poll from "./components/pages/poll";
import Profile from "./components/pages/profile";
import Settings from "./components/pages/settings";
import CreatePoll from "./components/pages/createPoll";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/polls/:id" element={<Poll />} />
      <Route path="/create-poll" element={<CreatePoll />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
