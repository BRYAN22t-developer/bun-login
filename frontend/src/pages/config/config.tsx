import { LinkButton } from "@/components/buttons/link-button";
import {  useAuth } from "@/context/auth";

export function ConfigPage() {
  const { accessToken } = useAuth()

  return <>
    <p className="mb-4">Access Token: {accessToken}</p>
    <LinkButton to="/">Go Home</LinkButton>
  </>
}
