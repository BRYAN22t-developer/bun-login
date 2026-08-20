import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const CLIENT_ID =
  "826707910170-rq6561njkh7im5tkhc8eua59ons0bct2.apps.googleusercontent.com";

const URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=http://localhost:5123/auth/callback/google&response_type=code&scope=openid email profile`;

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
  { path: "/", element: <a href={URL}>Login via Google</a> },
  { path: "/user", element: <UserPage /> },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
