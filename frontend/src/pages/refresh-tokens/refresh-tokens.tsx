import { Button } from "@/components/buttons/button";
import { config } from "@/config";
import { apiRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import { IconTrash, IconForbid2, IconCircleCheck } from "@tabler/icons-react";
import { LinkButton } from "@/components/buttons/link-button";

type RefreshToken = {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  revokedAt: string | null;
  createdAt: string;
};

const updateReactRefreshToken = { current: () => {} };

export function RefreshTokensPage() {
  const [refreshTokens, setRefreshTokens] = useState<RefreshToken[] | null>(
    null,
  );

  useEffect(() => {
    const refreshTokens = async () => {
      const res = await apiRequest(`${config.BACKEND_BASE_URL}/auth/tokens`);

      if (!res.ok) {
        alert(res);
        return;
      }

      const data = await res.json();
      setRefreshTokens(data);
    };

    refreshTokens().catch((err) => console.log(err));
    updateReactRefreshToken.current = () => setRefreshTokens(null);
  }, [refreshTokens]);

  return (
    <div className="flex flex-col">
      <div className="w-full m-10">
        <LinkButton to="/">Go Home</LinkButton>
      </div>
      {table(refreshTokens)}
    </div>
  );
}

function table(refreshTokens: RefreshToken[] | null) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-4 mb-2">
        <p>id</p>
        <p>user id</p>
        <p>refresh token</p>
        <p>created at</p>
        <p>expires at</p>
        <p>revoked</p>
        <p>actions</p>
      </div>
      {refreshTokens ? refreshTokens.map((rf) => row(rf)) : ""}
    </div>
  );
}

function row(refreshToken: RefreshToken) {
  return (
    <div className="grid grid-cols-7 gap-4 py-2">
      <p className="truncate">{refreshToken.id}</p>
      <p className="truncate">{refreshToken.userId}</p>
      <p className="truncate">{refreshToken.token}</p>
      <p className="truncate">
        {new Date(refreshToken.createdAt).toLocaleDateString()}
      </p>
      <p className="truncate">
        {new Date(refreshToken.expiresAt).toLocaleDateString()}
      </p>
      <p className="truncate">{refreshToken.revokedAt ? "true" : ""}</p>
      <div>
        {refreshToken.revokedAt !== null && (
          <Button
            onClick={() => {
              activateRefreshToken(refreshToken.token)
                .then((res) => updateReactRefreshToken.current())
                .catch((err) => alert(`Error: ${err}`));
            }}
          >
            <IconCircleCheck></IconCircleCheck>
          </Button>
        )}
        {refreshToken.revokedAt === null && (
          <Button
            onClick={() => {
              revokeRefreshToken(refreshToken.token)
                .then((res) => updateReactRefreshToken.current())
                .catch((err) => alert(`Error: ${err}`));
            }}
          >
            <IconForbid2 />
          </Button>
        )}
        <Button
          onClick={() => {
            deleteRefreshToken(refreshToken.token)
              .then((res) => {
                updateReactRefreshToken.current();
              })
              .catch((err) => alert(`Error: ${err}`));
          }}
        >
          <IconTrash />
        </Button>
      </div>
    </div>
  );
}

async function deleteRefreshToken(refreshToken: string) {
  const res = await apiRequest(
    `${config.BACKEND_BASE_URL}/auth/tokens/${refreshToken}`,
    {
      method: "DELETE",
    },
  );
}

async function revokeRefreshToken(refreshToken: string) {
  const res = await apiRequest(
    `${config.BACKEND_BASE_URL}/auth/revoke/${refreshToken}`,
    {
      method: "POST",
    },
  );
}

async function activateRefreshToken(refreshToken: string) {
  const res = await apiRequest(
    `${config.BACKEND_BASE_URL}/auth/activate/${refreshToken}`,
    {
      method: "POST",
    },
  );
}
