import { LinkButton } from "../buttons/link-button";

export function Header() {
  return (
    <header className="bg-primary h-20">
      <div className="flex px-2 justify-between items-center h-full text-background">
        <p className="font-bold">Login Page</p>
        <LinkButton to="/user" variant="primary">
          Login
        </LinkButton>
        <LinkButton to="/config" variant="primary">
          config
        </LinkButton>
        <LinkButton to="/refresh-tokens" variant="primary">
          refresh tokens
        </LinkButton>
        <LinkButton to="/register" variant="primary">
          Register
        </LinkButton>
      </div>
    </header>
  );
}
