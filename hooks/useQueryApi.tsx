import { useQuery, UseQueryResult } from "@tanstack/react-query";

type SearchResponse = {
  ns: number;
  pageid: number;
  size: number;
  snippet: string;
  timestamp: number;
  title: string;
  wordcount: number;
};

type SearchInfoResponse = {
  suggestion: string;
  suggestionsnippet: string;
  totalhits: number;
};

type WikiResponse = {
  search: SearchResponse[];
  searchinfo: SearchInfoResponse;
  query: any;
};

const useQueryApi = (searchInput: string) => {
  //fetcher function
  const getWikiData = async (): Promise<WikiResponse> => {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&format=json&srsearch=${searchInput}`
    );
    return res.json();
  };

  const { isLoading, isError, data }: UseQueryResult<WikiResponse> =
    useQuery<WikiResponse>(["searchWikipedia", searchInput], getWikiData, {
      enabled: searchInput.length > 0,
    });

  return { isLoading, isError, data };
};

export default useQueryApi;
