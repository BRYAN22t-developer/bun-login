import { Button } from "@/components/buttons/button";
import { config } from "@/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${config.BACKEND_BASE_URL}/user`, {
        credentials: "include",
      });

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setUser(data);
    };

    getData().catch((err) => console.error("Error fetching user:", err));
  }, []);

  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      <Button
        onClick={async () => {
          try {
            const res = await fetch(`${config.BACKEND_BASE_URL}/auth/logout`, {
              method: "POST",
              credentials: "include",
            });


            if (res.ok) {
              navigate("/");
              return
            }

            console.error("Logout failed: ", res.status)
          } catch (e) {
            console.error("Error: ", e)
          }

        }}
      >
        log out
      </Button>
    </div>
  );
}
