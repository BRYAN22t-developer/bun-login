import { LinkButton } from "@/components/buttons/link-button";
import { config } from "@/config";
import { useAuth } from "@/context/auth";
import { apiRequest } from "@/utils/api";
import { useState } from "react";

type User = {
  id: string;
  email: string;
  username: string;
  provider?: string;
};

export function ConfigPage() {
  const { accessToken } = useAuth();


  return (
    <>
      <p className="mb-4">Access Token: {accessToken}</p>
      <LinkButton to="/">Go Home</LinkButton>
      <UsersTable />
    </>
  );
}

function UsersTable() {
  const [users, setUsers] = useState<User[] | null>(null)
  getUsers().then(res => setUsers(res)).catch(err => alert(`Error: ${err}`))

  return (
    <table className="w-full">
      <tr className="flex gap-4 justify-evenly flex-4">
        <td>id</td>
        <td>email</td>
        <td>username</td>
        <td>provider</td>
      </tr>
      {users ? users?.map((user) => {
        return (
          <tr className="flex gap-4 justify-around">
            <td className="flex-1">{user.id}</td>
            <td className="flex-1">{user.email}</td>
            <td className="flex-1">{user.username}</td>
            <td className="flex-1">{user.provider ?? "Credentials"}</td>
          </tr>
        );
      }) : ""}
    </table>
  );
}

async function getUsers() {
  const res = await apiRequest(`${config.BACKEND_BASE_URL}/users`);

  if (!res.ok) {
    return null;
  }

  const data: User[] | null = await res.json();
  return data;
}
