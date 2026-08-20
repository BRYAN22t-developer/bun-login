import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <header className="bg-primary h-20">
        <div className="flex px-2 justify-between items-center h-full text-background">
          <p className="font-bold">Login Page</p>
          <Link to="/user" className="bg-primary border-surface border-1 p-2 rounded-lg hover:bg-primary-hover transition-transform hover:scale-105">Login</Link>
        </div>
      </header>
    </>
  );
}
