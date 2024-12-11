import { NotionPage } from "./schemas";

export function mapNotionPageToArticle(page: NotionPage): Article {
  return {
    id: page.id,
    title: page.properties.Page.title[0]?.plain_text || "",
    description: page.properties.Description.rich_text[0]?.plain_text || "",
    slug: page.properties.URL.url,
    publishedAt: new Date(page.properties["Publish date"]?.date?.start || ""),
  };
}
