import { useState, useRef } from "react";
import { searchResultSchema } from "@/schemas/searchSchema";
import { useDebounce } from "./useDebounce";
import { z } from "zod";
import { Document } from "@/schemas/searchSchema";
import { mapDocuments } from "../helpers/mapDocuments";

import fetchDanswerData from "@/services/danswerService";

const DEBOUNCE_DELAY = 500;

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);

  const previousQuery = useRef(debouncedQuery);

  const performSearch = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchDanswerData(debouncedQuery);
      const parcedResults = searchResultSchema.parse(data);
      const results = mapDocuments(parcedResults);

      setSearchResults(results);
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        setError("Invalid data structure from API");
      } else if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setError(null);
  };

  const onQueryChange = (newQuery: string) => {
    setSearchQuery(newQuery);
  };

  if (debouncedQuery !== previousQuery.current) {
    previousQuery.current = debouncedQuery;
    performSearch(debouncedQuery);
  }

  return {
    searchQuery,
    searchResults,
    isLoading,
    error,
    onClear,
    onQueryChange,
  };
}
