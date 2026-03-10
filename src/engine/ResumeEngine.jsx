import React from "react";

// ============================================================
// RESUME RENDER ENGINE
// Reads a template definition (JSON) + resume data and
// produces the visual output. New templates = new JSON only.
// ============================================================

// ── Colour resolver: replace '{accent}' tokens ──
function resolveColor(val, accent) {
  if (typeof val !== "string") return val;
  return val.replace("{accent}", accent);
}
function resolvePalette(palette, accent) {
  const out = {};
  for (const k in palette) out[k] = resolveColor(palette[k], accent);
  return out;
}

// ── SECTION HEAD STYLES ──────────────────────────────────────
function SectionHead({ label, style, accent, textColor, muted }) {
  switch (style) {
    case "uppercase-bar":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, marginTop: 2 }}>
          <div style={{ width: 3, height: 14, background: accent, borderRadius: 2, flexShrink: 0 }} />
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: accent }}>{label}</div>
        </div>
      );
    case "underline-accent":
      return (
        <div style={{ borderBottom: `2px solid ${accent}`, paddingBottom: 5, marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", color: textColor }}>{label}</div>
        </div>
      );
    case "serif-divider":
      return (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: textColor, letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 10 }}>
            {label}
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
          </div>
        </div>
      );
    case "bold-label":
      return (
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: accent, marginBottom: 10, marginTop: 4 }}>
          {label}
        </div>
      );
    case "simple-line":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{label}</div>
          <div style={{ flex: 1, height: 1, background: accent, opacity: 0.4 }} />
        </div>
      );
    case "code-comment":
      return (
        <div style={{ fontSize: 10, color: accent, fontFamily: "DM Mono, monospace", marginBottom: 10, marginTop: 4 }}>
          // {label.toLowerCase().replace(/ /g, "_")}
        </div>
      );
    case "editorial":
      return (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: muted, marginBottom: 3 }}>{label}</div>
          <div style={{ height: 3, background: accent, width: 32 }} />
        </div>
      );
    case "pill-head":
      return (
        <div
          style={{
            display: "inline-flex",
            background: accent,
            color: "#fff",
            borderRadius: 99,
            padding: "3px 14px",
            fontSize: 9.5,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}>
          {label}
        </div>
      );
    default:
      return (
        <div style={{ fontSize: 11, fontWeight: 700, color: textColor, borderBottom: `1px solid ${accent}`, paddingBottom: 4, marginBottom: 10 }}>
          {label.toUpperCase()}
        </div>
      );
  }
}

// ── SKILL STYLES ─────────────────────────────────────────────
const LEVEL_PCT = { Beginner: 25, Intermediate: 55, Advanced: 78, Expert: 95 };

function SkillsBlock({ skills, style, accent, textColor, muted, bg }) {
  if (!skills?.length) return null;
  switch (style) {
    case "bar":
      return (
        <div>
          {skills.map((sk) => (
            <div key={sk.id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 3, color: textColor }}>
                <span>{sk.name}</span>
                <span style={{ opacity: 0.5, fontSize: 9 }}>{sk.level}</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 99 }}>
                <div style={{ height: "100%", background: accent, borderRadius: 99, width: `${LEVEL_PCT[sk.level] || 60}%`, transition: "width 0.5s" }} />
              </div>
            </div>
          ))}
        </div>
      );
    case "chips":
    case "pill-chips":
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {skills.map((sk) => (
            <span
              key={sk.id}
              style={{
                background: `${accent}22`,
                border: `1px solid ${accent}44`,
                color: textColor,
                borderRadius: 99,
                padding: "2px 10px",
                fontSize: 10,
                fontWeight: 500,
              }}>
              {sk.name}
            </span>
          ))}
        </div>
      );
    case "tag":
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {skills.map((sk) => (
            <span
              key={sk.id}
              style={{ background: `${accent}20`, color: accent, borderRadius: 4, padding: "2px 8px", fontSize: 10, fontFamily: "DM Mono, monospace" }}>
              {sk.name}
            </span>
          ))}
        </div>
      );
    case "dots":
      return (
        <div>
          {skills.map((sk) => (
            <div key={sk.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{ width: 7, height: 7, borderRadius: "50%", background: i <= Math.ceil((LEVEL_PCT[sk.level] || 60) / 20) ? accent : `${accent}30` }}
                />
              ))}
              <span style={{ fontSize: 10, color: textColor }}>{sk.name}</span>
            </div>
          ))}
        </div>
      );
    case "dot-list":
      return (
        <div>
          {skills.map((sk) => (
            <div key={sk.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5, fontSize: 10 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: accent, flexShrink: 0 }} />
              <span style={{ color: textColor }}>{sk.name}</span>
            </div>
          ))}
        </div>
      );
    case "inline-list":
      return (
        <div style={{ fontSize: 10.5, color: textColor, lineHeight: 1.8 }}>
          {skills.map((sk, i) => (
            <span key={sk.id}>
              {sk.name}
              {i < skills.length - 1 ? <span style={{ color: accent, margin: "0 6px" }}>·</span> : ""}
            </span>
          ))}
        </div>
      );
    default:
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {skills.map((sk) => (
            <span key={sk.id} style={{ background: `${accent}18`, color: textColor, borderRadius: 6, padding: "3px 10px", fontSize: 10 }}>
              {sk.name}
            </span>
          ))}
        </div>
      );
  }
}

// ── EXPERIENCE STYLES ─────────────────────────────────────────
function dateStr(item) {
  if (!item.startYear) return "";
  const end = item.current ? "Present" : item.endYear || "";
  return [item.startMonth, item.startYear].filter(Boolean).join(" ") + (end ? ` – ${end}` : "");
}

function ExpBlock({ items, style, accent, textColor, muted, bg }) {
  if (!items?.length) return null;
  return (
    <div>
      {items.map((exp) => {
        switch (style) {
          case "timeline":
            return (
              <div key={exp.id} style={{ marginBottom: 14, paddingLeft: 14, borderLeft: `2px solid ${accent}30`, paddingBottom: 2 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 11.5, color: textColor }}>{exp.position || "—"}</div>
                  <div style={{ fontSize: 9.5, color: muted, whiteSpace: "nowrap", marginLeft: 8 }}>{dateStr(exp)}</div>
                </div>
                <div style={{ fontSize: 10.5, color: accent, fontWeight: 600, marginBottom: 4 }}>{[exp.company, exp.location].filter(Boolean).join(" · ")}</div>
                {exp.description && <div style={{ fontSize: 10, color: muted, lineHeight: 1.6, whiteSpace: "pre-line" }}>{exp.description}</div>}
              </div>
            );
          case "card":
            return (
              <div key={exp.id} style={{ marginBottom: 10, background: `${accent}10`, border: `1px solid ${accent}25`, borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 11.5, color: textColor }}>{exp.position || "—"}</div>
                  <div style={{ fontSize: 9, background: `${accent}25`, color: accent, padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>
                    {dateStr(exp)}
                  </div>
                </div>
                <div style={{ fontSize: 10.5, color: accent, fontWeight: 600, marginBottom: 4 }}>{[exp.company, exp.location].filter(Boolean).join(" · ")}</div>
                {exp.description && <div style={{ fontSize: 10, color: muted, lineHeight: 1.6, whiteSpace: "pre-line" }}>{exp.description}</div>}
              </div>
            );
          case "bordered-card":
            return (
              <div
                key={exp.id}
                style={{
                  marginBottom: 12,
                  background: `${accent}08`,
                  border: `1px solid ${accent}20`,
                  borderRadius: 6,
                  padding: "10px 14px",
                  borderLeft: `3px solid ${accent}`,
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <div style={{ fontWeight: 600, fontSize: 11, color: textColor, fontFamily: "DM Mono, monospace" }}>{exp.position || "—"}</div>
                  <div style={{ fontSize: 9, color: muted }}>{dateStr(exp)}</div>
                </div>
                <div style={{ fontSize: 10, color: accent, marginBottom: 4, fontFamily: "DM Mono, monospace" }}>@ {exp.company}</div>
                {exp.description && <div style={{ fontSize: 10, color: muted, lineHeight: 1.6, whiteSpace: "pre-line" }}>{exp.description}</div>}
              </div>
            );
          case "soft-card":
            return (
              <div key={exp.id} style={{ marginBottom: 12, background: `${accent}08`, borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 11.5, color: textColor }}>{exp.position || "—"}</div>
                  <div style={{ fontSize: 9.5, color: muted }}>{dateStr(exp)}</div>
                </div>
                <div style={{ fontSize: 10.5, color: accent, fontWeight: 600, marginBottom: 4 }}>{[exp.company, exp.location].filter(Boolean).join(" · ")}</div>
                {exp.description && <div style={{ fontSize: 10, color: muted, lineHeight: 1.6, whiteSpace: "pre-line" }}>{exp.description}</div>}
              </div>
            );
          case "minimal":
          case "flat":
          default:
            return (
              <div key={exp.id} style={{ marginBottom: 13, paddingBottom: 11, borderBottom: `1px solid ${accent}15` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 11.5, color: textColor }}>{exp.position || "—"}</div>
                  <div style={{ fontSize: 9.5, color: muted, whiteSpace: "nowrap" }}>{dateStr(exp)}</div>
                </div>
                <div style={{ fontSize: 10.5, color: accent, fontWeight: 600, marginBottom: 4 }}>{[exp.company, exp.location].filter(Boolean).join(" · ")}</div>
                {exp.description && <div style={{ fontSize: 10, color: muted, lineHeight: 1.65, whiteSpace: "pre-line" }}>{exp.description}</div>}
              </div>
            );
        }
      })}
    </div>
  );
}

// ── SECTION RENDERER ─────────────────────────────────────────
function renderSection(sectionId, resume, tpl, p, accent) {
  const headProps = { accent, textColor: p.mainText, muted: p.mainMuted, style: tpl.style.sectionHeadStyle };
  const headPropsSide = { accent: p.sidebarAccent || accent, textColor: p.sidebarText, muted: p.sidebarMuted, style: tpl.style.sectionHeadStyle };

  switch (sectionId) {
    case "summary":
      if (!resume.personal.summary) return null;
      return (
        <div key="summary" style={{ marginBottom: 14 }}>
          <SectionHead label="Professional Summary" {...headProps} />
          <div style={{ fontSize: 10.5, color: p.mainMuted, lineHeight: 1.75 }}>{resume.personal.summary}</div>
        </div>
      );
    case "experience":
      if (!resume.experience?.length) return null;
      return (
        <div key="experience" style={{ marginBottom: 14 }}>
          <SectionHead label="Work Experience" {...headProps} />
          <ExpBlock items={resume.experience} style={tpl.style.expStyle} accent={accent} textColor={p.mainText} muted={p.mainMuted} />
        </div>
      );
    case "education":
      if (!resume.education?.length) return null;
      return (
        <div key="education" style={{ marginBottom: 14 }}>
          <SectionHead label="Education" {...headProps} />
          {resume.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: 700, fontSize: 11.5, color: p.mainText }}>{[edu.degree, edu.field].filter(Boolean).join(" in ")}</div>
                <div style={{ fontSize: 9.5, color: p.mainMuted }}>{[edu.startYear, edu.current ? "Present" : edu.endYear].filter(Boolean).join(" – ")}</div>
              </div>
              <div style={{ fontSize: 10.5, color: accent, fontWeight: 600 }}>{edu.school}</div>
              {edu.gpa && <div style={{ fontSize: 10, color: p.mainMuted }}>GPA: {edu.gpa}</div>}
              {edu.description && <div style={{ fontSize: 10, color: p.mainMuted, marginTop: 2 }}>{edu.description}</div>}
            </div>
          ))}
        </div>
      );
    case "skills":
      if (!resume.skills?.length) return null;
      return (
        <div key="skills" style={{ marginBottom: 14 }}>
          <SectionHead label="Skills" {...headProps} />
          <SkillsBlock skills={resume.skills} style={tpl.style.skillStyle} accent={accent} textColor={p.mainText} muted={p.mainMuted} />
        </div>
      );
    case "projects":
      if (!resume.projects?.length) return null;
      return (
        <div key="projects" style={{ marginBottom: 14 }}>
          <SectionHead label="Projects" {...headProps} />
          {resume.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 11.5, color: p.mainText }}>
                {proj.name} {proj.role && <span style={{ fontSize: 10, color: accent, fontWeight: 400 }}>· {proj.role}</span>}
              </div>
              {proj.technologies && <div style={{ fontSize: 9.5, color: p.mainMuted, marginBottom: 2 }}>{proj.technologies}</div>}
              {proj.description && <div style={{ fontSize: 10, color: p.mainMuted, lineHeight: 1.6 }}>{proj.description}</div>}
            </div>
          ))}
        </div>
      );
    case "certifications":
      if (!resume.certifications?.length) return null;
      return (
        <div key="certifications" style={{ marginBottom: 14 }}>
          <SectionHead label="Certifications" {...headProps} />
          {resume.certifications.map((c) => (
            <div key={c.id} style={{ marginBottom: 6 }}>
              <div style={{ fontWeight: 600, fontSize: 11, color: p.mainText }}>{c.name}</div>
              {c.issuer && <div style={{ fontSize: 10, color: p.mainMuted }}>{c.issuer}</div>}
            </div>
          ))}
        </div>
      );
    case "languages":
      if (!resume.languages?.length) return null;
      return (
        <div key="languages" style={{ marginBottom: 14 }}>
          <SectionHead label="Languages" {...headProps} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {resume.languages.map((l) => (
              <div key={l.id} style={{ background: `${accent}15`, borderRadius: 6, padding: "3px 10px", fontSize: 10 }}>
                <span style={{ fontWeight: 600, color: p.mainText }}>{l.name}</span>
                <span style={{ color: p.mainMuted, marginLeft: 5 }}>· {l.level}</span>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

// ── SIDEBAR SECTION RENDERER ─────────────────────────────────
function renderSidebarSection(sectionId, resume, tpl, p, accent) {
  const sideAccent = p.sidebarAccent || accent;
  switch (sectionId) {
    case "photo":
      if (!resume.personal.photo) return null;
      return <PhotoBlock key="photo" photo={resume.personal.photo} style={tpl.style.photoStyle} accent={sideAccent} />;
    case "contact":
      return (
        <div key="contact" style={{ marginBottom: 16 }}>
          <SectionHead label="Contact" style={tpl.style.sectionHeadStyle} accent={sideAccent} textColor={p.sidebarText} muted={p.sidebarMuted} />
          {[
            [resume.personal.email, "✉"],
            [resume.personal.phone, "☎"],
            [resume.personal.city && `${resume.personal.city}${resume.personal.country ? ", " + resume.personal.country : ""}`, "◎"],
            [resume.personal.website, "⊕"],
            [resume.personal.linkedin, "in"],
          ]
            .filter(([v]) => v)
            .map(([v, ic]) => (
              <div key={v} style={{ display: "flex", gap: 7, marginBottom: 6, fontSize: 10, color: p.sidebarText, opacity: 0.85, alignItems: "flex-start" }}>
                <span style={{ color: sideAccent, fontWeight: 700, width: 14, flexShrink: 0, fontSize: 10 }}>{ic}</span>
                <span style={{ wordBreak: "break-all", lineHeight: 1.4 }}>{v}</span>
              </div>
            ))}
        </div>
      );
    case "skills":
      if (!resume.skills?.length) return null;
      return (
        <div key="skills" style={{ marginBottom: 16 }}>
          <SectionHead label="Skills" style={tpl.style.sectionHeadStyle} accent={sideAccent} textColor={p.sidebarText} muted={p.sidebarMuted} />
          <SkillsBlock skills={resume.skills} style={tpl.style.skillStyle} accent={sideAccent} textColor={p.sidebarText} muted={p.sidebarMuted} />
        </div>
      );
    case "languages":
      if (!resume.languages?.length) return null;
      return (
        <div key="languages" style={{ marginBottom: 16 }}>
          <SectionHead label="Languages" style={tpl.style.sectionHeadStyle} accent={sideAccent} textColor={p.sidebarText} muted={p.sidebarMuted} />
          {resume.languages.map((l) => (
            <div key={l.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 10, color: p.sidebarText }}>
              <span style={{ fontWeight: 600 }}>{l.name}</span>
              <span style={{ opacity: 0.55, fontSize: 9 }}>{l.level}</span>
            </div>
          ))}
        </div>
      );
    case "certifications":
      if (!resume.certifications?.length) return null;
      return (
        <div key="certifications" style={{ marginBottom: 16 }}>
          <SectionHead label="Certs" style={tpl.style.sectionHeadStyle} accent={sideAccent} textColor={p.sidebarText} muted={p.sidebarMuted} />
          {resume.certifications.map((c) => (
            <div key={c.id} style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: p.sidebarText }}>{c.name}</div>
              {c.issuer && <div style={{ fontSize: 9, color: p.sidebarMuted }}>{c.issuer}</div>}
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

// ── PHOTO BLOCK ──────────────────────────────────────────────
function PhotoBlock({ photo, style, accent }) {
  if (!photo) return null;
  const base = { width: 80, height: 80, overflow: "hidden", marginBottom: 14 };
  switch (style) {
    case "circle":
      return (
        <div style={{ ...base, borderRadius: "50%", border: `3px solid ${accent}40`, margin: "0 auto 14px" }}>
          <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      );
    case "circle-border":
      return (
        <div style={{ ...base, borderRadius: "50%", border: `3px solid ${accent}`, margin: "0 auto 14px" }}>
          <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      );
    case "square-rounded":
      return (
        <div style={{ ...base, borderRadius: 10, margin: "0 auto 14px" }}>
          <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      );
    default:
      return null;
  }
}

// ── NAME BLOCK ───────────────────────────────────────────────
function NameBlock({ resume, tpl, p, accent, inline }) {
  const fullName = [resume.personal.firstName, resume.personal.lastName].filter(Boolean).join(" ") || "Your Name";
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          fontFamily: tpl.fonts.heading === "DM Mono" ? "DM Mono, monospace" : "Inter, sans-serif",
          fontSize: tpl.style.nameSize || 28,
          fontWeight: 800,
          color: p.headerText || p.mainText,
          lineHeight: 1.05,
          letterSpacing: "-0.5px",
          marginBottom: 4,
        }}>
        {fullName}
      </div>
      {resume.personal.title && <div style={{ fontSize: 12, color: accent, fontWeight: 600 }}>{resume.personal.title}</div>}
    </div>
  );
}

// ── HEADER CONTACT (for single-col header) ───────────────────
function HeaderContact({ resume, p, accent }) {
  const items = [
    resume.personal.email,
    resume.personal.phone,
    resume.personal.city && `${resume.personal.city}${resume.personal.country ? ", " + resume.personal.country : ""}`,
    resume.personal.website,
  ].filter(Boolean);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 14px", fontSize: 10, color: p.headerText || p.mainText, opacity: 0.75 }}>
      {items.map((v) => (
        <span key={v}>{v}</span>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN RENDER ENGINE COMPONENT
// ══════════════════════════════════════════════════════════════
export default function ResumeEngine({ template, resume, accentColor, scale = 1 }) {
  const tpl = template;
  const accent = accentColor || "#6c63ff";
  const p = resolvePalette(tpl.palette, accent);
  const fullName = [resume.personal.firstName, resume.personal.lastName].filter(Boolean).join(" ") || "Your Name";

  // ── SIDEBAR LAYOUTS (left or right) ──────────────────────
  if (tpl.layout === "sidebar-left" || tpl.layout === "sidebar-right") {
    const sidebarEl = (
      <div
        style={{
          width: tpl.sidebarWidth || 220,
          background: p.sidebar,
          color: p.sidebarText,
          padding: "32px 20px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}>
        {/* Name in sidebar for right-sidebar layouts */}
        {tpl.layout === "sidebar-right" && (
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: tpl.fonts.heading === "DM Mono" ? "DM Mono, monospace" : "Inter, sans-serif",
                fontSize: tpl.style.nameSize || 24,
                fontWeight: 800,
                color: p.sidebarText,
                lineHeight: 1.1,
              }}>
              {fullName}
            </div>
            {resume.personal.title && <div style={{ fontSize: 11, color: p.sidebarAccent, fontWeight: 600, marginTop: 4 }}>{resume.personal.title}</div>}
          </div>
        )}
        {tpl.sections.sidebar.map((s) => renderSidebarSection(s, resume, tpl, p, accent))}
      </div>
    );

    const mainEl = (
      <div style={{ flex: 1, background: p.mainBg, padding: "32px 26px", overflow: "hidden" }}>
        {/* Name in main for left-sidebar layouts */}
        {tpl.layout === "sidebar-left" && (
          <div style={{ marginBottom: 14 }}>
            <NameBlock resume={resume} tpl={tpl} p={{ ...p, headerText: p.mainText }} accent={accent} />
          </div>
        )}
        {tpl.sections.main.filter((s) => s !== "nameBlock").map((s) => renderSection(s, resume, tpl, p, accent))}
      </div>
    );

    return (
      <div
        style={{
          display: "flex",
          fontFamily: "Outfit, sans-serif",
          fontSize: 11,
          minHeight: 1123,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: 794,
        }}>
        {tpl.layout === "sidebar-left" ? (
          <>
            {sidebarEl}
            {mainEl}
          </>
        ) : (
          <>
            {mainEl}
            {sidebarEl}
          </>
        )}
      </div>
    );
  }

  // ── SINGLE-COLUMN LAYOUT ─────────────────────────────────
  const headerSecs = tpl.sections.header || [];
  const mainSecs = tpl.sections.main || [];

  return (
    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 11, minHeight: 1123, transform: `scale(${scale})`, transformOrigin: "top left", width: 794 }}>
      {/* Header band */}
      <div style={{ background: p.headerBg, padding: "30px 44px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {headerSecs.includes("photo") && resume.personal.photo && <PhotoBlock photo={resume.personal.photo} style={tpl.style.photoStyle} accent={accent} />}
          <div style={{ flex: 1 }}>
            <NameBlock resume={resume} tpl={tpl} p={p} accent={p.headerAccent || accent} />
            {headerSecs.includes("contact") && <HeaderContact resume={resume} p={p} accent={p.headerAccent || accent} />}
          </div>
          {!headerSecs.includes("photo") && resume.personal.photo && tpl.style.photoStyle !== "none" && (
            <PhotoBlock photo={resume.personal.photo} style={tpl.style.photoStyle} accent={accent} />
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ background: p.mainBg, padding: "24px 44px" }}>{mainSecs.map((s) => renderSection(s, resume, tpl, p, accent))}</div>
    </div>
  );
}
