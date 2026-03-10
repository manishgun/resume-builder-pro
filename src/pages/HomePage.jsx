import React, { useEffect, useRef, useState } from "react";
import { useApp, SCREENS } from "../store/AppContext";
import s from "./HomePage.module.css";

const STATS = [
  { num: "2M+", label: "Resumes Created" },
  { num: "94%", label: "Interview Rate" },
  { num: "50+", label: "Templates" },
  { num: "4.9★", label: "User Rating" },
];

const FEATURES = [
  { icon: "⚡", title: "AI-Powered Flow", desc: "Smart onboarding that picks the best templates based on your experience and industry." },
  { icon: "🎨", title: "JSON Template Engine", desc: "Infinitely scalable template architecture. Every design is data-driven and instantly customizable." },
  { icon: "🎯", title: "Personalized Matching", desc: "Tell us your industry, style, and preferences. We surface the perfect templates for you." },
  { icon: "✨", title: "Live Preview", desc: "See every change reflected in real-time. Your resume updates as you type." },
  { icon: "🌈", title: "Accent Color Picker", desc: "Customize any template's color scheme with a single click. Hundreds of combinations." },
  { icon: "📄", title: "One-Click Export", desc: "Print or download your resume as a high-quality document, ready to send." },
];

const TESTIMONIALS = [
  {
    name: "Priya M.",
    role: "Software Engineer at Google",
    text: "Got 3 interviews in the first week of using this resume. The tech template was perfect for my profile.",
    avatar: "P",
  },
  {
    name: "Rahul S.",
    role: "Marketing Manager",
    text: "The onboarding flow is genius — it literally picked the exact template I would have chosen myself.",
    avatar: "R",
  },
  {
    name: "Ananya K.",
    role: "UX Designer",
    text: "Finally a resume builder that doesn't look like every other resume. The creative templates are stunning.",
    avatar: "A",
  },
];

function FloatingResumeMock() {
  return (
    <div className={s.mockOuter}>
      <div className={s.mockCard}>
        <div className={s.mockSidebar} />
        <div className={s.mockMain}>
          <div className={s.mockNameLine} />
          <div className={s.mockSubLine} />
          <div className={s.mockDivider} />
          {[0, 1, 2].map((i) => (
            <div key={i} className={s.mockSection}>
              <div className={s.mockHead} style={{ animationDelay: `${i * 0.1}s` }} />
              <div className={s.mockLine} style={{ width: "95%" }} />
              <div className={s.mockLine} style={{ width: "80%" }} />
              <div className={s.mockLine} style={{ width: "88%" }} />
            </div>
          ))}
        </div>
      </div>
      <div className={s.mockCard2}>
        <div className={s.mockCard2Inner}>
          <div className={s.mockSidebar2} />
          <div style={{ flex: 1, padding: "16px 14px" }}>
            <div className={s.mockNameLine} style={{ width: "70%" }} />
            <div className={s.mockSubLine} />
            <div className={s.mockLine} style={{ marginTop: 10 }} />
            <div className={s.mockLine} style={{ width: "75%" }} />
          </div>
        </div>
      </div>
      {/* Floating badges */}
      <div className={s.badge1}>
        <span>🎯</span> 3 templates matched
      </div>
      <div className={s.badge2}>
        <span className={s.greenDot} />
        <span>Live Preview</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { dispatch } = useApp();
  const heroRef = useRef();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const startBuilding = () => dispatch({ type: "GO", screen: SCREENS.ONBOARD_EXPERIENCE });

  return (
    <div className={s.root}>
      {/* NAV */}
      <nav className={`${s.nav} ${scrolled ? s.navScrolled : ""}`}>
        <div className={s.navInner}>
          <div className={s.logo}>
            <div className={s.logoMark}>RB</div>
            <span className={s.logoName}>Resume Builder</span>
          </div>
          <div className={s.navLinks}>
            <a href="#features">Features</a>
            <a href="#templates">Templates</a>
            <a href="#how">How It Works</a>
          </div>
          <button className={s.navCta} onClick={startBuilding}>
            Build Free →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className={s.hero} ref={heroRef}>
        <div className={s.heroGlow} />
        <div className={s.heroGrid} />
        <div className={s.heroInner}>
          <div className={s.heroLeft}>
            <div className={s.heroBadge}>
              <span className={s.heroBadgeDot} />
              Trusted by 2M+ professionals
            </div>
            <h1 className={s.heroTitle}>
              Build a resume
              <br />
              <span className={s.heroGradient}>that gets you hired</span>
            </h1>
            <p className={s.heroSub}>
              A smarter resume builder with a guided flow, personalized template matching, and a powerful JSON-driven engine that adapts to your industry.
            </p>
            <div className={s.heroCtas}>
              <button className={s.heroCta} onClick={startBuilding}>
                <span>Create My Resume</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className={s.heroSecondary} onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>
                See how it works
              </button>
            </div>
            <div className={s.heroStats}>
              {STATS.map((st) => (
                <div key={st.num} className={s.stat}>
                  <div className={s.statNum}>{st.num}</div>
                  <div className={s.statLabel}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={s.heroRight}>
            <FloatingResumeMock />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className={s.howSection}>
        <div className={s.sectionInner}>
          <div className={s.sectionTag}>The Process</div>
          <h2 className={s.sectionTitle}>From blank page to interview-ready in minutes</h2>
          <div className={s.steps}>
            {[
              {
                n: "01",
                icon: "🎯",
                title: "Tell Us About You",
                desc: "Answer a few quick questions about your experience level and industry. Takes 30 seconds.",
              },
              {
                n: "02",
                icon: "🎨",
                title: "Choose Your Style",
                desc: "Pick photo/no-photo, column layout, and design style. We match templates to your preferences.",
              },
              {
                n: "03",
                icon: "✍️",
                title: "Fill In Your Details",
                desc: "Enter your experience, education, and skills in our clean guided editor with live preview.",
              },
              { n: "04", icon: "📄", title: "Download & Apply", desc: "Export your polished resume and start landing interviews. Change templates anytime." },
            ].map((step, i) => (
              <div key={step.n} className={s.step} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={s.stepNum}>{step.n}</div>
                <div className={s.stepIcon}>{step.icon}</div>
                <h3 className={s.stepTitle}>{step.title}</h3>
                <p className={s.stepDesc}>{step.desc}</p>
                {i < 3 && <div className={s.stepArrow}>→</div>}
              </div>
            ))}
          </div>
          <div className={s.howCta}>
            <button className={s.heroCta} onClick={startBuilding}>
              Start Building — It's Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className={s.featSection}>
        <div className={s.sectionInner}>
          <div className={s.sectionTag}>Features</div>
          <h2 className={s.sectionTitle}>Everything you need to stand out</h2>
          <div className={s.featGrid}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className={s.featCard} style={{ animationDelay: `${i * 0.07}s` }}>
                <div className={s.featIcon}>{f.icon}</div>
                <h3 className={s.featTitle}>{f.title}</h3>
                <p className={s.featDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATE PREVIEW */}
      <section id="templates" className={s.tplSection}>
        <div className={s.sectionInner}>
          <div className={s.sectionTag}>Templates</div>
          <h2 className={s.sectionTitle}>12 stunning templates, infinite color combinations</h2>
          <p className={s.sectionSub}>Every template is powered by our JSON engine — consistent quality, unique personality.</p>
          <div className={s.tplGrid}>
            {[
              { name: "Atlas", color: "#6c63ff", tags: ["2-col", "Corporate"] },
              { name: "Nova", color: "#0ea5e9", tags: ["1-col", "Modern"] },
              { name: "Lumina", color: "#10b981", tags: ["1-col", "Minimal"] },
              { name: "Oracle", color: "#a78bfa", tags: ["2-col", "Tech"] },
              { name: "Prism", color: "#f43f5e", tags: ["2-col", "Creative"] },
              { name: "Meridian", color: "#c9952a", tags: ["1-col", "Executive"] },
              { name: "Horizon", color: "#22d3a5", tags: ["1-col", "Simple"] },
              { name: "Vertex", color: "#64748b", tags: ["2-col", "DevOps"] },
              { name: "Ethereal", color: "#ec4899", tags: ["1-col", "Elegant"] },
              { name: "Vanguard", color: "#f97316", tags: ["2-col", "Bold"] },
              { name: "Bloom", color: "#726af1", tags: ["1-col", "Soft"] },
              { name: "Slate", color: "#4b5563", tags: ["2-col", "Editorial"] },
            ].map((t) => (
              <div key={t.name} className={s.tplCard} style={{ "--tc": t.color }}>
                <div className={s.tplMock}>
                  <div className={s.tplMockInner} style={{ background: t.color }} />
                  <div className={s.tplMockLines}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className={s.tplMockLine} style={{ width: `${70 + Math.sin(i) * 20}%`, animationDelay: `${i * 0.08}s` }} />
                    ))}
                  </div>
                </div>
                <div className={s.tplCardBody}>
                  <div className={s.tplCardName}>{t.name}</div>
                  <div className={s.tplCardTags}>
                    {t.tags.map((tg) => (
                      <span key={tg} className={s.tplTag}>
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={s.testiSection}>
        <div className={s.sectionInner}>
          <div className={s.sectionTag}>Testimonials</div>
          <h2 className={s.sectionTitle}>Real people, real results</h2>
          <div className={s.testiGrid}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className={s.testiCard}>
                <div className={s.testiStars}>★★★★★</div>
                <p className={s.testiText}>"{t.text}"</p>
                <div className={s.testiAuthor}>
                  <div className={s.testiAvatar}>{t.avatar}</div>
                  <div>
                    <div className={s.testiName}>{t.name}</div>
                    <div className={s.testiRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={s.ctaSection}>
        <div className={s.ctaGlow} />
        <div className={s.ctaInner}>
          <h2 className={s.ctaTitle}>Your dream job is one resume away</h2>
          <p className={s.ctaSub}>Join over 2 million professionals who've built their career with Resume Builder.</p>{" "}
          <button className={s.ctaBtn} onClick={startBuilding}>
            Build My Resume — Free
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <p className={s.ctaNote}>No signup required. No credit card. 100% free.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={s.footer}>
        <div className={s.footerInner}>
          <div className={s.footerLogo}>
            <div className={s.logoMark}>RB</div>
            <span className={s.logoName}>Resume Builder</span>
          </div>
          <p className={s.footerNote}>© 2025 Resume Builder. Built with ♥ for job seekers everywhere.</p>
        </div>
      </footer>
    </div>
  );
}
