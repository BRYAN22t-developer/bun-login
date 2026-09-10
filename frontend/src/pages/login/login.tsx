import { Button } from "@/components/buttons/button";
import { AnchorButton } from "@/components/buttons/anchor-button";
import { config } from "@/config";
import { login } from "@/utils/auth/login";
import { router } from "@/router";

export default function LoginPage() {
  return (
    <>
      <section className="mt-10 w-full flex justify-center">
        <div className="flex flex-col">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 bg-primary text-surface p-5 rounded-lg"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                required
                className="bg-surface/20 p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
                className="bg-surface/20 p-2"
              />
            </div>
            <Button type="submit">Login</Button>
          </form>
          <div className="mt-2 ">
            <AnchorButton
              href={`${config.BACKEND_BASE_URL}/auth/google`}
              className="flex"
            >
              <GoogleSvg />
              <span className="w-full flex justify-center text-primary font-semibold">
                Continue with Google
              </span>
            </AnchorButton>
          </div>
        </div>
      </section>
    </>
  );
}

async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    alert(`Error: no email or password`);
    return;
  }

  const res = await login(email, password);

  if (!res.ok) {
    alert(`Error: ${res.body}`)
  }

  router.navigate("/user")

}

function GoogleSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="25"
      height="25"
      viewBox="0 0 48 48"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  );
}
