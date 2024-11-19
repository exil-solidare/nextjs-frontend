import { getNotionPages } from "@/lib/notion/notion";
import Link from "next/link";

export default async function Home() {
  const posts = await getNotionPages({ pageSize: 10 });

  return (
    <div className="min-h-screen p-2 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Франция | Гайд по иммиграции и интеграции
        </h1>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.properties.URL.url}`}
              className="block p-6 border rounded hover:bg-gray-50"
            >
              <h2 className="text-xl font-semibold">
                {post.properties.Page.title[0].plain_text}
              </h2>
              <p className="text-gray-600 mt-2">
                {new Date(post.created_time).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
