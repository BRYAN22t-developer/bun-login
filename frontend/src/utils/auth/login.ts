import { config } from "@/config";
import { apiRequest } from "../api";

export async function login(email: string, password: string) {
  const res = await apiRequest(`${config.BACKEND_BASE_URL}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return res;
}
