import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";

type OpenGraphResult = {
  result: {
    ogTitle: string;
    ogDescription: string;
    ogImage: { url: string; }[];
  };
};

export const Opengraph: FC<{
  url: string;
  setName: (name: string) => void;
  setUrl: (url: string) => void;
  setImage: (image: string) => void;
  setDescription: (description: string) => void;
}> = ({ url, setName, setUrl, setImage, setDescription }) => {
  const { data } = useQuery({
    queryKey: ["scrape", url],
    queryFn: async () => {
      const result = await fetch(`http://localhost:3000/scrape?url=${url}`);

      return result.json() as Promise<OpenGraphResult>;
    },
  });

  return (
    <div className="border border-gray-300 rounded-md mb-2">
      <input type="text" placeholder="https://url.com" className="rounded-md p-2 w-full" value={url} onChange={e => setUrl(e.target.value)} />
      {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
      {data && (
        <div>
          <h1>
            {data.result?.ogTitle}

            <button onClick={() => setName(data.result?.ogTitle)} className="rounded-md p-2 border border-gray-300">Set title</button>
          </h1>
          <p>
            {data.result?.ogDescription}
            <button onClick={() => setDescription(data.result?.ogDescription)} className="rounded-md p-2 border border-gray-300">Set description</button>
          </p>
          <img src={data.result?.ogImage?.[0]?.url} alt={data.result.ogTitle} className="w-full max-h-48 object-contain" />
          <button onClick={() => setImage(data.result?.ogImage?.[0]?.url)} className="rounded-md p-2 border border-gray-300">Set image</button>
        </div>
      )}
    </div>
  );
};
