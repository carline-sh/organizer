import { createFileRoute } from "@tanstack/react-router";

import { AddStockForm } from "../components/addstock";

export const Route = createFileRoute("/stock")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="border border-gray-300 rounded-md p-4">
      <AddStockForm />
    </div>
  );
}
