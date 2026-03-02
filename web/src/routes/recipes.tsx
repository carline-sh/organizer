import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LuSearch } from "react-icons/lu";

export const Route = createFileRoute("/recipes")({
  component: RouteComponent,
});

type Recipe = { recipe_id: number; name: string; url: string; };

function RouteComponent() {
  const { data } = useQuery({
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
      <div className="flex gap-2">
        <div className="mt-2 flex gap-2 w-2/3">
          <input type="text" placeholder="https://url.com" className="rounded-md p-2 w-full border border-gray-300" />
          <button
            className="rounded-md p-2 border whitespace-pre text-white cursor-pointer bg-cyan-700 hover:bg-cyan-800 active:translate-y-0.5"
            onClick={() => mutate({ name: "New Recipe", url: "https://www.google.com" })}
          >
            Add Recipe
          </button>
        </div>
      </div>
      <hr className="my-2 border-cyan-400" />
      <div className="w-full flex justify-end">
        <div className="flex justify-end border border-gray-300 rounded-md items-center gap-2">
          <input type="text" placeholder="Search recipes" className=" rounded-md p-2 w-full" />
          <div className="p-2">
            <LuSearch className="text-gray-700" />
          </div>
        </div>
      </div>
      {data?.map(recipe => (
        <div className="border border-gray-300 text-gray-700 rounded-md p-2 mt-2 odd:bg-gray-100" key={recipe.recipe_id}>
          <h2 className="font-bold">{recipe.name}</h2>
          <p>{recipe.url}</p>
        </div>
      ))}
    </div>
  );
}
