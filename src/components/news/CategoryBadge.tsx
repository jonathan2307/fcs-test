import { type NewsCategory } from "@/data/news";
import { cn } from "@/lib/utils";

const styles: Record<NewsCategory, string> = {
  Spielbericht: "bg-primary/10 text-primary",
  Vereinsnews: "bg-blue-50 text-blue-700",
  Transfer: "bg-green-50 text-green-700",
};

export function CategoryBadge({ category }: { category: NewsCategory }) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-semibold px-2.5 py-0.5 rounded-[4px] uppercase tracking-wide",
        styles[category]
      )}
    >
      {category}
    </span>
  );
}
