import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { news } from "@/data/news";
import { formatDateLong } from "@/lib/utils";
import { CategoryBadge } from "@/components/news/CategoryBadge";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return news.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = news.find((a) => a.slug === params.slug);
  if (!article) return { title: "Nicht gefunden" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function NewsDetailPage({ params }: Props) {
  const article = news.find((a) => a.slug === params.slug);
  if (!article) notFound();

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="bg-primary py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ChevronLeft size={14} /> Zurück zu News
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <CategoryBadge category={article.category} />
            <span className="text-white/60 text-sm">{formatDateLong(article.date)}</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-700 text-white uppercase leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Image placeholder */}
        <div className="bg-surface-alt rounded-[5px] h-72 flex items-center justify-center mb-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-heading text-primary text-2xl font-700">FC</span>
            </div>
            <p className="text-xs text-text-muted">Foto folgt</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-sm max-w-none">
          {article.content.split("\n\n").map((para, i) => (
            <p key={i} className="font-body text-text leading-relaxed mb-5">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline"
          >
            <ChevronLeft size={14} /> Alle Berichte
          </Link>
        </div>
      </div>
    </div>
  );
}
