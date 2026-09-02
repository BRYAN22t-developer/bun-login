import { Button } from "@/components/buttons/button";
import { LinkButton } from "@/components/buttons/link-button";
import {  AuthContext, useAuth } from "@/context/auth";
import { useContext } from "react";

export function ConfigPage() {
  const { accessToken } = useAuth()

  return <>
    <p className="mb-4">Access Token: {accessToken}</p>
    <LinkButton to="/">Go Home</LinkButton>
  </>
}
