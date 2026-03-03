import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { TAGS } from "../util/tags";

export const AddProductForm = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (product: { name: string; tags: string[]; }) => {
      const result = await fetch("http://localhost:3000/shopping-list", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-list"] });
    },
  });
  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <form
      className=" text-gray-700"
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ name, tags: selectedTags });
      }}
    >
      <div className="flex flex-col gap-2 rounded-md">
        <input type="text" placeholder="Name" className="border border-gray-300 rounded-md p-2 flex-1" value={name} onChange={e => setName(e.target.value)} />

        <div className="flex flex-wrap gap-2 text-white">
          {TAGS.map(tag => (
            <button
              key={tag.value}
              type="button"
              className={`${tag.color} text-white p-2 rounded-md cursor-pointer active:translate-y-0.5 ${selectedTags.includes(tag.value) ? "" : "opacity-50"}`}
              onClick={(e) => {
                e.preventDefault();

                if (selectedTags.includes(tag.value)) {
                  setSelectedTags(prev => prev.filter(t => t !== tag.value));
                }
                else {
                  setSelectedTags(prev => [...prev, tag.value]);
                }
              }}
            >
              {tag.name}
            </button>
          ))}
        </div>

        <button type="submit" className="bg-cyan-700 text-white p-2 rounded-md cursor-pointer hover:bg-cyan-800 active:translate-y-0.5">Add list item</button>
      </div>
    </form>
  );
};
