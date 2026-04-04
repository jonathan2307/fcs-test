import type { Metadata } from "next";
import { fetchInstagramFeed } from "@/lib/instagram-feed";
import { InstagramPostCard } from "@/components/news/InstagramPostCard";

export const metadata: Metadata = {
  title: "News",
  description: "Aktuelle Berichte, Spielberichte und Vereinsnachrichten vom FC Schwarzach.",
};

export default async function NewsPage() {
  const posts = await fetchInstagramFeed();

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-heading text-sm font-600 uppercase tracking-widest text-white/60 mb-1">
            FC Schwarzach
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-700 text-white uppercase">
            News & Berichte
          </h1>
          <p className="mt-4 text-sm font-body text-white/70">
            Aktuelle Posts vom Instagram-Kanal
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {posts.length === 0 ? (
          <p className="text-text-muted text-center py-20 font-body">
            Keine Beiträge verfügbar. Bitte später erneut versuchen.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <InstagramPostCard key={post.link} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
