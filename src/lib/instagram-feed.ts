export interface InstagramPost {
  title: string;
  link: string;
  pubDate: string;
  imageUrl: string;
  caption: string;
}

const FEED_URL = "https://rss.app/feeds/37kqGBysaC91dAIT.json";

interface JsonFeedItem {
  id: string;
  url: string;
  title: string;
  content_text: string;
  content_html: string;
  date_published: string;
}

interface JsonFeed {
  items: JsonFeedItem[];
}

function extractImageFromHtml(html: string): string {
  const match = html.match(/<img[^>]*src="([^"]*)"/);
  return match?.[1] ?? "";
}

export async function fetchInstagramFeed(): Promise<InstagramPost[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data: JsonFeed = await res.json();

    return (data.items ?? []).map((item) => ({
      title: item.title,
      link: item.url,
      pubDate: item.date_published,
      imageUrl: extractImageFromHtml(item.content_html ?? ""),
      caption: item.content_text ?? "",
    }));
  } catch {
    return [];
  }
}
