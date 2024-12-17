import { SearchResult } from "@/schemas/searchSchema";

export const mapDocuments = (parcedResults: SearchResult) => {
  return parcedResults.documents.map((doc) => ({
    semantic_identifier: doc.semantic_identifier || "Untitled",
    link: doc.link,
  }));
};
