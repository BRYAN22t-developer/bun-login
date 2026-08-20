import { Link } from "react-router-dom";

export default function HomePage() {
  return <>
    <header className="flex">
      <p>Login Page</p>
      <Link to="/user">Login</Link>
    </header>

  </>
}
