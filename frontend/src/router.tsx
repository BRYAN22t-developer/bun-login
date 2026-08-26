import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/home";
import UserPage from "./pages/user/user";
import LoginPage from "./pages/login/login";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/user", element: <UserPage /> },
  { path: "/login", element: <LoginPage /> },
]);
