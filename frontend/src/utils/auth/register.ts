import { config } from "@/config";
import { apiRequest } from "../api";

export async function register(email: string, password: string) {
  const res = await apiRequest(`${config.BACKEND_BASE_URL}/auth/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return res;
}
