import { createFileRoute } from "@tanstack/react-router";
import { LuSearch } from "react-icons/lu";

export const Route = createFileRoute("/recipes")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="border border-gray-300 rounded-md py-4 px-4">
      <div className="border border-gray-300 rounded-md mt-2 flex items-center gap-2">
        <input type="text" placeholder="Search recipes" className=" rounded-md p-2 w-full" />
        <div className="p-2">
          <LuSearch className="text-gray-700" />
        </div>
      </div>
      <hr className="my-2 border-cyan-400" />
      <h1 className="text-2xl color-gray-700">soup</h1>
      <button className="rounded-md p-2 border border-gray-300 text-gray-600 cursor-pointer hover:bg-gray-100 active:translate-y-0.5">
        Add Recipe
      </button>
    </div>
  );
}
