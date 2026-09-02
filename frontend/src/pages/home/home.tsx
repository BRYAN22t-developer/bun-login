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
          <Button onClick={request} >request</Button>
        </div>
      </header>
    </>
  );
}

async function request() {
  const res = await apiRequest("http://localhost:5123/test")
  console.log(res)
}
