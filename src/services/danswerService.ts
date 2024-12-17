const fetchDanswerData = async (debouncedQuery: string) => {
  const response = await fetch(
    "https://danswer.exil-solidaire.fr/api/query/simple-search",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: debouncedQuery,
        filters: {
          source_type: null,
          document_set: null,
          time_cutoff: null,
        },
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`No results found for "${debouncedQuery}"`);
  }

  return await response.json();
};

export default fetchDanswerData;
