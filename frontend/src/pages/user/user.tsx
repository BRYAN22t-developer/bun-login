import { Button } from "@/components/buttons/button";
import { LinkButton } from "@/components/buttons/link-button";
import { config } from "@/config";
import { accessTokenRef, updateReactToken } from "@/context/auth";
import { apiRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await apiRequest(`${config.BACKEND_BASE_URL}/user`, {
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
        variant="secondary"
        onClick={async () => {
          try {
            const res = await fetch(`${config.BACKEND_BASE_URL}/auth/logout`, {
              method: "POST",
              credentials: "include",
            });

            if (res.ok) {
              accessTokenRef.current = null;
              updateReactToken.current(null);
              navigate("/");
              return;
            }

          } catch (e) {
            console.error("Error: ", e);
          }
        }}
      >
        log out
      </Button>
      <LinkButton to="/">Go Home</LinkButton>
    </div>
  );
}
