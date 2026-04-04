"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "1955", label: "Gegründet" },
  { value: "10", label: "Mannschaften" },
  { value: "50+", label: "Mitglieder" },
  { value: "70+", label: "Jahre Vereinsgeschichte" },
];

export function StatsBar() {
  return (
    <section className="bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-heading text-4xl sm:text-5xl font-700 text-white leading-none">
                {stat.value}
              </p>
              <p className="font-body text-sm text-white/70 mt-2 uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
