import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Landing";
import SignUpPage from "./pages/SignUp";
import { LogInPage } from "./pages/LogIn";
import { ProfilePage } from "./pages/Profile";
import { GameDetailsPage } from "./pages/steam/GameDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [],
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
  {
    path: "/logIn",
    element: <LogInPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/game/:appid",
    element: <GameDetailsPage />,
  },
]);

export default router;
