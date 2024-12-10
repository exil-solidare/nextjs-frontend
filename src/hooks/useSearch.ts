import { useState, useEffect } from "react";
import { searchResultSchema } from "@/schemas/searchSchema";
import { z } from "zod";
import { documentSchema } from "@/schemas/searchSchema";

type SearchResult = z.infer<typeof documentSchema>;

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async () => {
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
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      const validatedData = searchResultSchema.parse(data);

      const results = validatedData.documents.map((doc) => ({
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

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

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
