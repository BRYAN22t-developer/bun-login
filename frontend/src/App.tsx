import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";

function UserPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5123/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      <button
        onClick={async () => {
          const res = await fetch("http://localhost:5123/auth/logout", {
            method: "POST",
            credentials: "include",
          });

          if (res.ok) {
            Navigate({ to: "/" });
          }
        }}
      >
        log out
      </button>
    </div>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/user", element: <UserPage /> },
  { path: "/login", element: <LoginPage /> },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
