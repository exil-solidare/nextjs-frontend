import { getArticles } from "@/lib/notion/notion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const articles = await getArticles({ pageSize: 10 });

  return (
    <div className="min-h-screen p-2 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Франция | Гайд по иммиграции и интеграции
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/posts/${article.slug}`}
              className="block hover:no-underline"
            >
              <Card className="transition-border hover:shadow-md">
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{article.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  {new Date(article.publishedAt).toLocaleDateString()}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
