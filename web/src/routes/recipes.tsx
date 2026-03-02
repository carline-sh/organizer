import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LuSearch } from "react-icons/lu";

export const Route = createFileRoute("/recipes")({
  component: RouteComponent,
});

type Recipe = { recipe_id: number; name: string; url: string; };

function RouteComponent() {
  const { data, refetch } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const result = await fetch("http://localhost:3000/recipes");

      return result.json() as Promise<Recipe[]>;
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (recipe: { name: string; url: string; }) => {
      const result = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        body: JSON.stringify(recipe),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  return (
    <div className="border border-gray-300 rounded-md py-4 px-4">
      <div className="border border-gray-300 rounded-md mt-2 flex items-center gap-2">
        <input type="text" placeholder="Search recipes" className=" rounded-md p-2 w-full" />
        <div className="p-2">
          <LuSearch className="text-gray-700" />
        </div>
      </div>
      <hr className="my-2 border-cyan-400" />
      <h1 className="text-2xl color-gray-700"></h1>
      <button
        className="rounded-md p-2 border border-gray-300 text-gray-600 cursor-pointer hover:bg-gray-100 active:translate-y-0.5"
        onClick={() => mutate({ name: "New Recipe", url: "https://www.google.com" })}
      >
        Add Recipe
      </button>
      {data?.map(recipe => (
        <div key={recipe.recipe_id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.url}</p>
        </div>
      ))}
    </div>
  );
}
