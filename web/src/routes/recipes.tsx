import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";

import { Opengraph } from "../components/Opengraph";

export const Route = createFileRoute("/recipes")({
  component: RouteComponent,
});

type Recipe = { recipe_id: number; name: string; url: string; image: string; description: string; };

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const result = await fetch("http://localhost:3000/recipes");

      return result.json() as Promise<Recipe[]>;
    },
  });

  const queryClient = useQueryClient();
  const { mutate: addRecipe } = useMutation({
    mutationFn: async (recipe: Omit<Recipe, "recipe_id">) => {
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
      setName("");
      setImage("");
      setDescription("");
      setUrl("");
    },
  });

  const { mutate: deleteRecipe } = useMutation({
    mutationFn: async (recipe_id: number) => {
      const result = await fetch("http://localhost:3000/recipes", {
        method: "DELETE",
        body: JSON.stringify({ recipe_id }),
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

  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="border border-gray-300 rounded-md p-4">
      <div className="flex gap-2">
        <div className=" w-full">
          <input type="text" placeholder="Title" className="rounded-md p-2 w-full mb-2 border border-gray-300" value={name} onChange={e => setName(e.target.value)} />
          <input type="text" placeholder="Image" className="rounded-md p-2 w-full mb-2 border border-gray-300" value={image} onChange={e => setImage(e.target.value)} />
          <input type="text" placeholder="Description" className="rounded-md p-2 w-full mb-2 border border-gray-300" value={description} onChange={e => setDescription(e.target.value)} />
          <Opengraph
            url={url}
            setName={setName}
            setUrl={setUrl}
            setImage={setImage}
            setDescription={setDescription}
          />
          <button
            className="rounded-md w-full p-2 border whitespace-pre text-white cursor-pointer bg-cyan-700 hover:bg-cyan-800 active:translate-y-0.5"
            onClick={() => addRecipe({ name, url, image, description })}
          >
            Add recipe
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
      <div>

        {data?.map(recipe => (
          <div className="border border-gray-300 text-gray-700 rounded-md p-2 mt-2 odd:bg-gray-100" key={recipe.recipe_id}>
            <div className="flex justify-between">
              <div className="flex items-start gap-2">
                {
                  recipe.image && (
                    <div className="w-24 h-24 aspect-square">
                      <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                    </div>
                  )
                }
                <div className="w-fit">
                  <h2 className="text-cyan-700">{recipe.name}</h2>
                  <a href={recipe.url} target="_blank" className="hover:underline">{recipe.url}</a>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <button
                  className="flex items-center justify-center h-8 aspect-square cursor-pointer rounded-md hover:bg-red-400 hover:text-white active:translate-y-0.5"
                  onClick={() => deleteRecipe(recipe.recipe_id)}
                >
                  <FiTrash className="text-gray-700" />
                </button>
              </div>
            </div>

          </div>

        ))}
      </div>
    </div>
  );
}
