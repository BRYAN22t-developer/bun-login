import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";
import UserPage from "./pages/user/user";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/user", element: <UserPage /> },
  { path: "/login", element: <LoginPage /> },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
