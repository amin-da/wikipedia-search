import { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import useQueryApi from "../hooks/useQueryApi";
import useDebounce from "../utils/useDebounce";

export const Home: NextPage = () => {
  //Search Input Value
  const [searchTerm, setSearchTerm] = useState<string>("");
  //Debounce Value
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  let { isLoading, isError, data } = useQueryApi(debouncedSearchTerm);

  let params: [string | number] = data?.query.search;

  if (isError)
    return (
      <div className="container flex justify-center w-full mt-5 font-medium">
        Somthings Wrong....
      </div>
    );

  return (
    <div className="flex flex-col items-center w-full h-full ">
      <Head>
        <title>Search in wikipedia</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container w-full max-[800px]:w-5/6">
        <h3 className="w-full mt-2 mb-1 font-medium">Search in wikipedia...</h3>
        <input
          type="search"
          name="serch-input"
          placeholder="Pleas Search Somthings..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-2 rounded-md border-slate-200 focus:outline-none focus:ring focus:ring-sky-300 "
        />
      </div>
      {!searchTerm && (
        <p className="container flex justify-center w-full mt-5 font-medium">
          Pleas Search Somthings
        </p>
      )}
      {isLoading && searchTerm && (
        <p className="container flex justify-center w-full mt-5 font-medium">
          Pleas Wait
        </p>
      )}
      <div className="container flex flex-col justify-start w-full max-[800px]:w-4/5 last:mb-4">
        {searchTerm &&
          params &&
          params.map((item: any) => (
            <a
              target="blanck"
              href={`https://en.wikipedia.org/?curid=${item.pageid}`}
              className="w-full pt-8 mt-4 transition-all duration-150 border-2 rounded-md cursor-pointer group border-slate-200 hover:border-slate-400"
              key={item.pageid}
            >
              <p className="p-4 font-medium text-sky-500">{item.title}</p>
              <div className="w-full p-8 mt-4 transition-all duration-150 border-t-2 border-slate-200 group-hover:border-slate-400">
                <p
                  className="p-4"
                  dangerouslySetInnerHTML={{ __html: `${item.snippet}` }}
                />
              </div>
            </a>
          ))}
      </div>
    </div>
  );
};

export default Home;
