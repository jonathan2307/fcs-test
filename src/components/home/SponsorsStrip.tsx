"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { sponsors } from "@/data/sponsors";

export function SponsorsStrip() {
  return (
    <section className="py-14 bg-surface-alt border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center font-heading text-sm uppercase tracking-widest text-text-muted mb-8">
          Unsere Partner & Sponsoren
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-white border border-border rounded-[5px] px-6 py-4 min-w-[130px] h-16 hover:border-primary hover:shadow-sm transition-all"
                title={sponsor.name}
              >
                <span className="font-heading font-600 text-text text-sm uppercase tracking-wide">
                  {sponsor.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/sponsoren"
            className="text-primary text-sm font-semibold hover:underline"
          >
            Alle Sponsoren ansehen →
          </Link>
        </div>
      </div>
    </section>
  );
}
