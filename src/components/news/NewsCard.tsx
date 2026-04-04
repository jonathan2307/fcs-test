import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { type NewsArticle } from "@/data/news";
import { formatDate } from "@/lib/utils";
import { CategoryBadge } from "./CategoryBadge";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}`} className="group block h-full">
      <div className="bg-white border border-border rounded-[5px] overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        {/* Image placeholder */}
        <div className="bg-surface-alt h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-heading text-primary text-xl font-700">FC</span>
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <CategoryBadge category={article.category} />
            <span className="text-xs text-text-muted">{formatDate(article.date)}</span>
          </div>
          <h3 className="font-heading font-600 text-lg text-text uppercase leading-snug mb-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-text-muted font-body leading-relaxed flex-1 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold">
            Weiterlesen <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}
