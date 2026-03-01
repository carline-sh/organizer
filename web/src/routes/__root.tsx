import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

const RootLayout = () => (
  <div className="w-full max-w-3xl mx-auto py-4 space-y-4">
    <div className="p-2 flex gap-4 bg-cyan-500 text-white rounded-md">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      {" "}
      <Link to="/groceries" className="[&.active]:font-bold">
        Groceries
      </Link>
      <Link to="/stock" className="[&.active]:font-bold">
        Stock
      </Link>
      <Link to="/recipes" className="[&.active]:font-bold">
        Recipes
      </Link>
      <Link to="/planning" className="[&.active]:font-bold">
        Planning
      </Link>
    </div>

    <Outlet />
    {/* <TanStackRouterDevtools /> */}
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
