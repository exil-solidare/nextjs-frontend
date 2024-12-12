import { useState, useRef } from "react";
import { searchResultSchema } from "@/schemas/searchSchema";
import { useDebounce } from "./useDebounce";
import { z } from "zod";
import { documentSchema } from "@/schemas/searchSchema";

type SearchResult = z.infer<typeof documentSchema>;

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(searchQuery, 500);

  const previousQuery = useRef(debouncedQuery);

  const performSearch = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://danswer.exil-solidaire.fr/api/query/simple-search",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: searchQuery,
            filters: {
              source_type: null,
              document_set: null,
              time_cutoff: null,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`No results found for "${searchQuery}"`);
      }
      const data = await response.json();
      const results = searchResultSchema.parse(data).documents.map((doc) => ({
        semantic_identifier: doc.semantic_identifier || "Untitled",
        link: doc.link,
      }));

      setSearchResults(results);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError("Invalid data structure from API");
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (debouncedQuery !== previousQuery.current) {
    previousQuery.current = debouncedQuery;
    performSearch(debouncedQuery);
  }

  return {
    searchQuery,
    setSearchQuery,
    setSearchResults,
    searchResults,
    isLoading,
    error,
    setError,
  };
}
