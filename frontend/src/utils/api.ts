import { config } from "@/config";
import { accessTokenRef } from "@/context/auth";
import { useNavigate } from "react-router-dom";

export async function apiRequest(url: string, options: RequestInit = {}) {
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers, Authorization: `Bearer ${accessTokenRef.current}`
    },
    credentials: "include"
  })

  if (res.status === 401) {
    const refreshed = await fetch(`${config.BACKEND_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include"
    })

    if (refreshed.ok) {
      const { access_token } = await refreshed.json()
      accessTokenRef.current = access_token

      res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorizathion: `Bearer ${access_token}`
        },
        credentials: "include"
      })
    } else {
      accessTokenRef.current = null
      redirectToLogin()
    }
  }
}

function redirectToLogin() {
  const navigate = useNavigate();
  navigate("/login")
}
