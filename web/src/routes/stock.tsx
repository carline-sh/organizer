import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FiRefreshCcw, FiTrash } from "react-icons/fi";

import { AddStockForm } from "../components/addstock";
import { STOCK_TAGS } from "../util/tags";

export const Route = createFileRoute("/stock")({
  component: RouteComponent,
});

type Stock = { stock_id: number; name: string; tags: string[]; };

function RouteComponent() {
  const { data, refetch } = useQuery({
    queryKey: ["stock"],
    queryFn: async () => {
      const result = await fetch("http://localhost:3000/stock");

      return result.json() as Promise<Stock[]>;
    },
  });

  return (
    <div className="border border-gray-300 rounded-md p-4">
      <AddStockForm />
      <hr className="my-2 border-cyan-400" />
      <button className="rounded-md p-2 border border-gray-300 text-gray-600 cursor-pointer hover:bg-gray-100 active:translate-y-0.5" onClick={() => refetch()}>
        <FiRefreshCcw />
      </button>
      <ul className="">
        {
          data?.map(stock => (
            <StockItem key={stock.stock_id} stock={stock} />
          ))
        }
      </ul>
    </div>
  );
}

const StockItem = (props: { stock: Stock; }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (stock: { stock_id: number; }) => {
      const result = await fetch("http://localhost:3000/stock", {
        method: "DELETE",
        body: JSON.stringify(stock),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
  });

  return (
    <li key={props.stock.stock_id} className="text-gray-700 flex justify-between py-2 px-2 mt-2 odd:bg-gray-100 items-center border border-gray-300 rounded-md">
      <div>
        {props.stock.name}
      </div>
      <div className="flex gap-2 items-center">
        {props.stock.tags?.map((tag) => {
          const tagConfig = STOCK_TAGS.find(t => t.value === tag);

          return (
            <span key={tag} className={`border text-xs px-1 py-0.5 bg-gray-100 rounded-md text-white ${tagConfig?.color}`}>
              {tag}
            </span>
          );
        })}

        <button className="p-2 cursor-pointer rounded-md hover:bg-red-400 hover:text-white active:translate-y-0.5" onClick={() => mutate({ stock_id: props.stock.stock_id })}><FiTrash className="text-gray-700" /></button>
      </div>
    </li>
  );
};
