import { Button } from "@/components/buttons/button";
import { router } from "@/router";
import { register } from "@/utils/auth/register";

export function RegisterPage() {
  return (
    <section className="flex flex-row justify-center mt-10">
      <form
        onSubmit={handlesubmit}
        className="flex flex-col gap-6 bg-primary text-surface p-5 rounded-lg"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.example"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            required
          ></input>
        </div>
        <Button type="submit">register</Button>
      </form>
    </section>
  );
}

async function handlesubmit(event: React.SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    alert(`Error: no email or password`)
    return;
  }

  const res = await register(email, password);

  if (!res.ok) {
    console.log(await res.json())
    return
  }

  router.navigate("/login");
}
