import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center px-4">
        <Image
          src="https://fcschwarzach.com/assets/logo.png"
          alt="FC Schwarzach Logo"
          width={100}
          height={100}
          className="mx-auto mb-8 object-contain opacity-80"
        />
        <p className="font-heading text-8xl sm:text-9xl font-700 text-white/20 leading-none mb-2">
          404
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-700 text-white uppercase mb-3">
          Seite nicht gefunden
        </h1>
        <p className="font-body text-white/70 mb-8 max-w-sm mx-auto">
          Diese Seite existiert leider nicht. Vielleicht wurde sie verschoben oder der Link ist
          falsch.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white text-primary font-body font-semibold px-8 py-3 rounded-[5px] hover:bg-surface-warm transition-colors text-sm uppercase tracking-wide"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
