import { Client } from "@notionhq/client";
import { validateEnv } from "../env";
import { NotionPages, pagesSchema } from "./schemas";
import { withNotionErrorHandling } from "./errorHandlers";

const env = validateEnv();
const notion = new Client({
  auth: env.NOTION_TOKEN,
});

export const getNotionPages = async ({
  pageSize,
  startCursor,
}: {
  pageSize: number;
  startCursor?: string;
}) => {
  return withNotionErrorHandling<NotionPages>(async () => {
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
    console.log(JSON.stringify(response.results));
    return pagesSchema.parse(response.results);
  }, "Failed to fetch pages");
};
