import { Button } from "@/components/buttons/button";
import { LinkButton } from "@/components/buttons/link-button";
import { apiRequest } from "@/utils/api";

export default function HomePage() {
  return (
    <>
      <header className="bg-primary h-20">
        <div className="flex px-2 justify-between items-center h-full text-background">
          <p className="font-bold">Login Page</p>
          <LinkButton to="/user" variant="primary">
            Login
          </LinkButton>
          <LinkButton to="/config" variant="primary">config</LinkButton>
        </div>
      </header>
    </>
  );
}
