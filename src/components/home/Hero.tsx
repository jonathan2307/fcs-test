"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-primary min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Gradient bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-dark to-transparent" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <Image
            src="https://fcschwarzach.com/assets/logo.png"
            alt="FC Schwarzach Logo"
            width={160}
            height={160}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl font-700 text-white uppercase tracking-wide leading-none mb-4"
        >
          FC Schwarzach
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-white/80 text-lg sm:text-xl font-body mb-10 leading-relaxed"
        >
          Leidenschaft. Zusammenhalt. Schwarz-Rot seit 1955.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/spielplan"
            className="inline-flex items-center gap-2 bg-white text-primary font-body font-semibold px-7 py-3.5 rounded-[5px] hover:bg-surface-warm transition-colors text-sm uppercase tracking-wide"
          >
            <Calendar size={18} />
            Nächstes Spiel
          </Link>
          <Link
            href="/verein"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-body font-semibold px-7 py-3.5 rounded-[5px] hover:bg-white/10 transition-colors text-sm uppercase tracking-wide"
          >
            <Users size={18} />
            Über uns
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
