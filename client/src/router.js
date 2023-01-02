import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Landing";
import SignUpPage from "./pages/SignUp";
import { LogInPage } from "./pages/LogIn";
import { ProfilePage } from "./pages/Profile";
import { GameDetailsPage } from "./pages/GameDetails";
import { AchievementsPage } from "./pages/Achievements";
import { GameWatchlistPage } from "./pages/GameWatchlist";

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
    path: "/game",
    element: <ProfilePage />,
  },
  {
    path: "/watchlist",
    element: <GameWatchlistPage />,
  },
  {
    path: "/achievements",
    element: <AchievementsPage />,
  },
  {
    path: "/game/:appid",
    element: <GameDetailsPage />,
  },
]);

export default router;
