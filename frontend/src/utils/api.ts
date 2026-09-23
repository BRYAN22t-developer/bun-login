import { config } from "@/config";
import { accessTokenRef, updateReactToken } from "@/context/auth";

let refreshPromise: Promise<string | null> | null = null;

export async function apiRequest(url: string, options: RequestInit = {}) {
  let res = await fetchUrl(url, options);

  if (res.status !== 401) {
    return res;
  }

  if (!refreshPromise) {
    refreshPromise = refreshToken();
  }

  const newAccessToken = await refreshPromise;

  if (!newAccessToken) {
    accessTokenRef.current = null;
    updateReactToken.current(null);
    redirectToLogin();
    return res;
  }

  res = await fetchUrl(url, options);
  return res;
}

function redirectToLogin() {
  window.location.href = "/login";
}

async function fetchUrl(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessTokenRef.current}`,
    },
  });
  return res;
}

async function refreshToken() {
  try {
    const refreshed = await fetch(`${config.BACKEND_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshed.ok) {
      const { access_token } = await refreshed.json();

      accessTokenRef.current = access_token;
      updateReactToken.current(access_token);

      return access_token;
    }
    return null;
  } catch (error) {
    return null;
  } finally {
    refreshPromise = null;
  }
}
