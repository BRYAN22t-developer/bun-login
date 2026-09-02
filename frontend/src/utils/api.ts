import { config } from "@/config";
import { accessTokenRef } from "@/context/auth";

let refreshPromise: Promise<string | null> | null = null;

export async function apiRequest(url: string, options: RequestInit = {}) {
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessTokenRef.current}`,
    },
    credentials: "include",
  });

  if (res.status === 401) {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const refreshed = await fetch(
            `${config.BACKEND_BASE_URL}/auth/refresh`,
            {
              method: "POST",
              credentials: "include",
            },
          );

          if (refreshed.ok) {
            const { access_token } = await refreshed.json();
            accessTokenRef.current = access_token;
            return access_token;
          }
          return null;
        } catch (error) {
          return null;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    const newAccessToken = await refreshPromise;

    if (newAccessToken) {
      res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`, // Typo fixed here
        },
        credentials: "include",
      });
    } else {
      accessTokenRef.current = null;
      redirectToLogin();
    }
  }

  return res;
}

function redirectToLogin() {
  window.location.href = "/login";
}
