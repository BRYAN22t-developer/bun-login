import { Button } from "@/components/buttons/button";
import { LinkButton } from "@/components/buttons/link-button";
import { config } from "@/config";
import { useAuth } from "@/context/auth";
import { apiRequest } from "@/utils/api";
import { IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";

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
      <div className="m-10 rounded-lg overflow-hidden border border-transparent">
        <UsersTable />
      </div>
    </>
  );
}

function UsersTable() {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res))
      .catch((err) => alert(`Error: ${err}`));
  }, [users]);

  return (
    <table className="w-full text-left border-collapse border-primary">
      <thead>
        <tr className="border-b border-gray-300 bg-primary text-surface">
          <th className="p-3 font-semibold">id</th>
          <th className="p-3 font-semibold">email</th>
          <th className="p-3 font-semibold">username</th>
          <th className="p-3 font-semibold">provider</th>
          <th className="p-3 font-semibold">actions</th>
        </tr>
      </thead>

      <tbody>
        {users?.map((user) => (
          <tr
            key={user.id}
            className="border-b border-gray-100 hover:bg-gray-50"
          >
            <td className="p-3">{user.id}</td>
            <td className="p-3">{user.email}</td>
            <td className="p-3">{user.username}</td>
            <td className="p-3">{user.provider ?? "Credentials"}</td>
            <td className="p-3">
              <Button
                className="bg-danger hover:bg-danger-hover"
                onClick={() => {
                  const deleteUser = async () => {
                    const res = await apiRequest(
                      `${config.BACKEND_BASE_URL}/users/${user.id}`,
                      {
                        method: "DELETE",
                      },
                    );

                    if (!res.ok) {
                      throw new Error("Error deleting user");
                    }
                  };

                  deleteUser()
                    .then((res) => setUsers(null))
                    .catch((err) => alert(`Error: ${err}`));
                }}
              >
                <IconTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
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
