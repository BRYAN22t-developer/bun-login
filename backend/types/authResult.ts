export type AuthResult = {
  user: AuthUser,
  token: string
}

export type AuthUser = {
  id: string
  username: string,
}
