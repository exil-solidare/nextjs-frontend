import { Client } from "@notionhq/client";
import { validateEnv } from "../env";
import { pagesSchema } from "./schemas";
import { withNotionErrorHandling } from "./errorHandlers";
import { mapNotionPageToArticle } from "./mapper";

const env = validateEnv();
const notion = new Client({
  auth: env.NOTION_TOKEN,
});

export const getArticles = async ({
  pageSize,
  startCursor,
}: {
  pageSize: number;
  startCursor?: string;
}) => {
  return withNotionErrorHandling<Article[]>(async () => {
    const response = await notion.databases.query({
      database_id: env.NOTION_DATABASE_ID,
      filter: {
        property: "Status",
        status: {
          equals: "published",
        },
      },
      sorts: [
        {
          property: "Publish date",
          direction: "descending",
        },
      ],
      page_size: pageSize,
      start_cursor: startCursor,
    });
    const parsedNotionPages = pagesSchema.parse(response.results);

    return parsedNotionPages.map(mapNotionPageToArticle);
  }, "Failed to fetch pages");
};
