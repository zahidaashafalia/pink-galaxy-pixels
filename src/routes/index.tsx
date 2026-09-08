import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import heroPhones from "@/assets/hero-phones.jpg";
import portrait from "@/assets/portrait.jpg";
import projectsShot from "@/assets/projects.jpg";
import ctaCrystal from "@/assets/cta-crystal.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex Morgan — Flutter Developer Portfolio" },
      {
        name: "description",
        content:
          "Flutter developer crafting premium, high-performance mobile experiences for startups and global brands.",
      },
      { property: "og:title", content: "Alex Morgan — Flutter Developer Portfolio" },
      {
        property: "og:description",
        content: "Premium mobile experiences built with Flutter, designed to feel effortless.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- helpers ---------- */

function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d", transition: "transform .35s ease-out" }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transition = "transform .08s linear";
        el.style.transform = `perspective(1100px) rotateY(${x * 16}deg) rotateX(${-y * 14}deg) translateZ(24px)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transition = "transform .6s cubic-bezier(.2,.8,.2,1)";
        el.style.transform = "perspective(1100px) rotateY(0) rotateX(0) translateZ(0)";
      }}
    >
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && setShown(true),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "perspective(900px) translateY(40px) rotateX(8deg)",
        transition: `opacity .8s ease ${delay}ms, transform .9s cubic-bezier(.2,.8,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`block h-[70px] w-full text-cream md:h-[110px] ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M0,64 C240,120 420,8 720,40 C1010,72 1200,128 1440,72 L1440,120 L0,120 Z"
      />
    </svg>
  );
}

/* ---------- data ---------- */

const skills = [
  { name: "Dart", level: "90%", note: "Language" },
  { name: "Provider", level: "90%", note: "State Management" },
  { name: "Firebase", level: "85%", note: "Backend" },
  { name: "RESTful API", level: "90%", note: "Integration" },
  { name: "UI/UX", level: "88%", note: "Design" },
];

const projects = [
  { name: "Fintra", desc: "A modern finance app for interior money management.", tags: ["Flutter", "Firebase", "Charts"] },
  { name: "Healora", desc: "Health & wellness app that helps users build better habits.", tags: ["Flutter", "API", "Dio"] },
  { name: "Shopzee", desc: "E-commerce app with seamless shopping experience.", tags: ["Flutter", "Stripe", "Firebase"] },
  { name: "Travelio", desc: "Travel companion app for exploring the world.", tags: ["Flutter", "Maps", "API"] },
];

const timeline = [
  { years: "2018 – 2019", role: "Junior Developer", org: "StarX Labs", text: "Worked on building cross-platform apps and learned the foundations of Flutter." },
  { years: "2019 – 2021", role: "Flutter Developer", org: "TechNova Solutions", text: "Built and shipped multiple production apps for startups and SMEs." },
  { years: "2021 – 2023", role: "Senior Developer", org: "CodeWave Studios", text: "Led a team of developers and delivered complex projects for global clients." },
  { years: "2023 – Present", role: "Freelance Developer", org: "Working Worldwide", text: "Helping brands and startups turn ideas into beautiful mobile experiences." },
];

const testimonials = [
  { quote: "He truly understands both aesthetics and performance. Clean, scalable code.", name: "Sophia Bennett", role: "Product Manager" },
  { quote: "Outstanding work! The app was delivered on time, with top-notch quality and attention to detail.", name: "James Carter", role: "CEO, Fintra", featured: true },
  { quote: "A reliable developer who communicates well and goes the extra mile.", name: "Daniel Roberts", role: "Founder, Shopzee" },
];

/* ---------- page ---------- */

function Index() {
  return (
    <main className="surface-night overflow-x-hidden text-white">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-galaxy)] font-display text-lg italic">
              A
            </span>
          </a>
          <ul className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            {["Work", "About", "Skills", "Experience", "Testimonials"].map((i) => (
              <li key={i}>
                <a href={`#${i.toLowerCase()}`} className="transition-colors hover:text-white">
                  {i}
                </a>
              </li>
            ))}
            <li>
              <Link to="/contact" className="transition-colors hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/6289682537741"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-white/20 px-4 py-2 text-xs text-white/80 transition-colors hover:bg-white/10 sm:inline-block"
            >
              089682537741
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-galaxy/60 px-5 py-2 text-sm text-white/90 transition-all hover:bg-galaxy/20 hover:shadow-[var(--shadow-glow)]"
            >
              Let's Talk →
            </Link>
          </div>
        </nav>

      </header>

      {/* HERO */}
      <section id="top" className="relative px-6 pt-32 pb-10 md:pt-40">
        <div className="pointer-events-none absolute -top-40 left-1/2 size-[900px] -translate-x-1/2 rounded-full bg-galaxy/20 blur-[160px] animate-pulse-glow" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="mb-5 text-xs tracking-[0.35em] text-galaxy-glow uppercase">Flutter Developer</p>
            <h1 className="font-display text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
              Crafting Premium
              <br />
              Mobile <span className="text-galaxy-gradient">Experiences</span>
              <br />
              that <em className="italic">People Love</em>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              I design and build high-performance, beautiful and intuitive Flutter applications for
              startups and global brands.
            </p>
            <a
              href="#work"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[image:var(--gradient-galaxy)] px-7 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
            >
              View My Work <span>→</span>
            </a>
          </Reveal>

          <Reveal delay={150}>
            <Tilt className="animate-float-3d">
              <img
                src={heroPhones}
                width={1200}
                height={1008}
                alt="Flutter app screens on floating phones over a pink galaxy"
                className="w-full rounded-3xl"
              />
            </Tilt>
            <div className="mt-[-3rem] ml-auto w-fit glass-panel rounded-full px-5 py-3 text-xs text-white/80">
              <span className="mr-2 inline-block size-2 rounded-full bg-galaxy-glow" />
              Available for new opportunities
            </div>
          </Reveal>
        </div>
      </section>

      <Wave />

      {/* ABOUT */}
      <section id="about" className="bg-cream px-6 py-16 text-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <Tilt>
              <img
                src={portrait}
                width={912}
                height={912}
                loading="lazy"
                alt="Watercolor portrait of Alex Morgan"
                className="w-full max-w-md rounded-full"
              />
            </Tilt>
          </Reveal>
          <Reveal delay={120}>
            <p className="mb-4 text-xs tracking-[0.35em] text-galaxy uppercase">About Me</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Code is my medium.
              <br />
              Empathy is my <em className="italic text-galaxy">superpower.</em>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/60">
              I'm a Flutter developer with 6+ years of experience building pixel-perfect,
              high-performance mobile applications that solve real problems and create real impact.
            </p>
            <div className="mt-10 flex gap-12">
              {[
                ["06+", "Years Experience"],
                ["45+", "Projects Delivered"],
                ["18+", "Happy Clients"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-4xl">{n}</div>
                  <div className="mt-1 text-xs text-ink/50">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Wave flip />

      {/* SKILLS */}
      <section id="skills" className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.35em] text-galaxy-glow uppercase">My Skills</p>
            <h2 className="font-display text-4xl md:text-5xl">
              Expertise with
              <br />
              <em className="italic text-galaxy-gradient">Passion.</em>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              I combine creativity and technical excellence to build products that are fast,
              beautiful and future-ready.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-3" style={{ perspective: "1200px" }}>
            <Reveal>
              <div className="card-3d glass-panel row-span-2 flex h-full flex-col items-center justify-center gap-4 rounded-3xl p-10">
                <div className="grid size-20 place-items-center rounded-2xl bg-[image:var(--gradient-galaxy)] font-display text-3xl">
                  F
                </div>
                <div className="text-lg font-medium">Flutter</div>
                <div className="text-xs text-white/50">95%</div>
              </div>
            </Reveal>
            {skills.map((s, i) => (
              <Reveal key={s.name} delay={60 * i}>
                <div className="card-3d glass-panel rounded-2xl p-5">
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-[11px] text-white/45">{s.note}</div>
                  <div className="mt-4 h-1 w-full rounded-full bg-white/10">
                    <div
                      className="h-1 rounded-full bg-[image:var(--gradient-galaxy)]"
                      style={{ width: s.level }}
                    />
                  </div>
                  <div className="mt-2 text-[11px] text-white/40">{s.level}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.35em] text-galaxy-glow uppercase">Featured Work</p>
            <h2 className="font-display text-4xl md:text-5xl">
              Digital experiences <span className="text-galaxy">/</span>
              <br />
              that make an <em className="italic text-galaxy-gradient">impact.</em>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <Tilt className="mt-12">
              <img
                src={projectsShot}
                width={1408}
                height={800}
                loading="lazy"
                alt="Four Flutter app project mockups"
                className="w-full rounded-3xl"
              />
            </Tilt>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-4" style={{ perspective: "1200px" }}>
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={70 * i}>
                <div className="card-3d glass-panel h-full rounded-2xl p-6">
                  <h3 className="font-display text-xl">{p.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-galaxy/40 px-3 py-1 text-[10px] text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Wave />

      {/* EXPERIENCE */}
      <section id="experience" className="bg-cream px-6 py-16 text-ink">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.35em] text-galaxy uppercase">Experience</p>
            <h2 className="font-display text-4xl md:text-5xl">
              The journey
              <br />
              that <em className="italic text-galaxy">shaped me.</em>
            </h2>
          </Reveal>
          <div className="relative mt-14 grid gap-10 md:grid-cols-4">
            <div className="absolute top-5 right-0 left-0 hidden h-px bg-ink/15 md:block" />
            {timeline.map((t, i) => (
              <Reveal key={t.role} delay={80 * i}>
                <div className="relative">
                  <div
                    className={`mb-6 grid size-10 place-items-center rounded-full text-xs ${
                      i === timeline.length - 1
                        ? "bg-[image:var(--gradient-galaxy)] text-white shadow-[var(--shadow-glow)]"
                        : "bg-ink text-white"
                    }`}
                  >
                    ◈
                  </div>
                  <div className="text-[11px] text-ink/45">{t.years}</div>
                  <div className="mt-1 font-medium">{t.role}</div>
                  <div className="text-xs text-ink/50">{t.org}</div>
                  <p className="mt-3 text-xs leading-relaxed text-ink/60">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Wave flip />

      {/* TESTIMONIALS */}
      <section id="testimonials" className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.35em] text-galaxy-glow uppercase">Testimonials</p>
            <h2 className="font-display text-4xl md:text-5xl">
              People <em className="italic text-galaxy-gradient">love</em> working
              <br />
              with me.
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3" style={{ perspective: "1200px" }}>
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={80 * i}>
                <div
                  className={`card-3d glass-panel h-full rounded-2xl p-6 ${
                    t.featured ? "shadow-[var(--shadow-glow)] md:-translate-y-6 md:scale-105" : "opacity-70"
                  }`}
                >
                  <div className="font-display text-3xl text-galaxy">“</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{t.quote}</p>
                  <div className="mt-6">
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-[11px] text-white/45">{t.role}</div>
                    <div className="mt-2 text-xs text-galaxy-glow">★★★★★</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Wave />

      {/* CTA */}
      <section id="contact" className="bg-cream px-6 py-16 text-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.35em] text-galaxy uppercase">Let's Work Together</p>
            <h2 className="font-display text-4xl md:text-5xl">
              Have a <em className="italic text-galaxy">project</em>
              <br />
              in mind?
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
              I'm always open to discussing new projects, creative ideas or opportunities to be part
              of your vision.
            </p>
            <a
              href="mailto:zahidaasafalia@gmail.com"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3 text-sm text-white transition-transform hover:scale-105"
            >
              Let's Talk ✈
            </a>
          </Reveal>
          <Reveal delay={120}>
            <Tilt className="animate-float-3d">
              <img
                src={ctaCrystal}
                width={928}
                height={720}
                loading="lazy"
                alt="Glowing pink crystal shards"
                className="w-full rounded-3xl"
              />
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-galaxy)] font-display italic">
                A
              </span>
              <div>
                <div className="font-medium tracking-wide">ALEX MORGAN</div>
                <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase">
                  Flutter Developer
                </div>
              </div>
            </div>
          </div>
          {[
            ["Navigation", ["Work", "About", "Skills", "Experience"]],
            ["Resources", ["Blog", "Case Studies", "GitHub", "Resume"]],
            ["Connect", ["LinkedIn", "Dribbble", "Twitter", "Email"]],
          ].map(([title, items]) => (
            <div key={title as string}>
              <div className="mb-4 text-xs text-white/80">{title as string}</div>
              <ul className="space-y-2 text-xs text-white/45">
                {(items as string[]).map((it) => (
                  <li key={it}>
                    <a href="#top" className="transition-colors hover:text-galaxy-glow">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-[11px] text-white/35">
          © 2026 Alex Morgan. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
