"use client";
import { useSearch } from "../hooks/useSearch";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  const {
    searchQuery,
    setSearchQuery,
    setSearchResults,
    searchResults,
    isLoading,
    error,
    setError,
  } = useSearch();

  const handleSubmit = () => {
    setSearchQuery("");
    setSearchResults([]);
    setError(null);
  };

  return (
    <div className="flex  ">
      <Button
        onClick={handleSubmit}
        className="border border-gray-500 text-gray-300 bg-black-100 rounded-lg mx-2 hover:bg-gray-500"
      >
        Clear
      </Button>
      <div className="relative flex flex-col items-center">
        <div className="flex items-center justify-between ">
          {isLoading ? (
            <div className="absolute mx-2 w-4 h-4 border-3 border-t-2 border-gray-500 rounded-full animate-spin"></div>
          ) : (
            <MagnifyingGlassIcon className="absolute size-5 mx-2 text-gray-500" />
          )}
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="border-gray-500 min-w-72 relative pl-8"
          />
          {error && (
            <p className="text-red-500 absolute z-10 p-1 px-2 w-full border rounded-lg border-red-600 ">
              {error}
            </p>
          )}
        </div>

        {searchResults.length > 0 && (
          <div className="absolute top-full mt-2 bg-gray-800 text-white rounded shadow-lg z-10 w-full ">
            {searchResults.slice(0, 10).map((result, index) => (
              <div key={index} className="p-2 hover:bg-gray-500 ">
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:underline "
                >
                  {result.semantic_identifier}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
