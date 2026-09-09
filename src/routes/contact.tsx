import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontak — Zahida Asafalia, Web Designer & Developer" },
      {
        name: "description",
        content:
          "Hubungi Zahida Asafalia untuk proyek web design, UI design, atau pengembangan website.",
      },
      {
        property: "og:title",
        content: "Kontak — Zahida Asafalia, Web Designer & Developer",
      },
      {
        property: "og:description",
        content: "Kirim pesan atau chat WhatsApp untuk membahas proyek website kamu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const EMAIL = "zahidaasafalia@gmail.com";
const PHONE = "089682537741";
const WA = "6289682537741";

const socials = [
  { name: "GitHub", href: "https://github.com/zahidaashafalia" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/asha-fally-027480422" },
  { name: "Instagram", href: "https://www.instagram.com/ashafally" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || name.length > 100) return setError("Nama wajib diisi (maks. 100 karakter).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
      return setError("Alamat email tidak valid.");
    if (!message || message.length > 1000)
      return setError("Pesan wajib diisi (maks. 1000 karakter).");

    setError("");
    const body = `Nama: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      `Pesan baru dari ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-galaxy";

  return (
    <main className="surface-night min-h-screen overflow-x-hidden px-6 py-24 text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[800px] -translate-x-1/2 rounded-full bg-galaxy/20 blur-[160px]" />

      <div className="relative mx-auto max-w-5xl">
        <Link to="/" className="text-xs text-white/50 transition-colors hover:text-white">
          ← Kembali
        </Link>

        <p className="mt-8 mb-4 text-xs tracking-[0.35em] text-galaxy-glow uppercase">Kontak</p>
        <h1 className="font-display text-4xl leading-tight md:text-5xl">
          Mari bicarakan <em className="italic text-galaxy-gradient">proyekmu.</em>
        </h1>

        <div className="mt-12 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={onSubmit} className="glass-panel rounded-3xl p-7">
            <div className="grid gap-4">
              <input name="name" placeholder="Nama kamu" maxLength={100} className={field} />
              <input name="email" placeholder="Email kamu" maxLength={255} className={field} />
              <textarea
                name="message"
                rows={6}
                maxLength={1000}
                placeholder="Ceritakan tentang proyekmu…"
                className={field}
              />
            </div>
            {error && <p className="mt-4 text-xs text-galaxy-glow">{error}</p>}
            {sent && !error && (
              <p className="mt-4 text-xs text-white/70">
                Aplikasi email kamu terbuka dengan pesan yang sudah siap dikirim.
              </p>
            )}
            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-galaxy)] px-7 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
            >
              Kirim Pesan →
            </button>
          </form>

          <div className="grid content-start gap-4">
            <a href={`mailto:${EMAIL}`} className="glass-panel block rounded-3xl p-6">
              <div className="text-[11px] tracking-[0.3em] text-white/40 uppercase">Email</div>
              <div className="mt-2 text-sm break-all text-white/85">{EMAIL}</div>
            </a>
            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noreferrer"
              className="glass-panel block rounded-3xl p-6"
            >
              <div className="text-[11px] tracking-[0.3em] text-white/40 uppercase">WhatsApp</div>
              <div className="mt-2 text-sm text-white/85">{PHONE}</div>
            </a>
            <a
              href={`tel:+62${PHONE.replace(/^0/, "")}`}
              className="rounded-full border border-galaxy/60 px-6 py-3 text-center text-sm text-white/90 transition-all hover:bg-galaxy/20 hover:shadow-[var(--shadow-glow)]"
            >
              Telepon {PHONE}
            </a>

            <div className="glass-panel rounded-3xl p-6">
              <div className="text-[11px] tracking-[0.3em] text-white/40 uppercase">Media Sosial</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-galaxy/60 px-4 py-2 text-xs text-white/90 transition-all hover:bg-galaxy/20 hover:shadow-[var(--shadow-glow)]"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
