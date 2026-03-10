import React, { useState } from "react";
import { useApp, SCREENS } from "../store/AppContext";
import { TEMPLATES, getTemplate } from "../templates/templateDefs";
import ResumeEngine from "../engine/ResumeEngine";
import s from "./Preview.module.css";

const ACCENT_COLORS = [
  { c: "#6c63ff", n: "Violet" },
  { c: "#0ea5e9", n: "Sky" },
  { c: "#22d3a5", n: "Teal" },
  { c: "#f59e0b", n: "Amber" },
  { c: "#f43f5e", n: "Rose" },
  { c: "#a78bfa", n: "Purple" },
  { c: "#ec4899", n: "Pink" },
  { c: "#14b8a6", n: "Cyan" },
  { c: "#f97316", n: "Orange" },
  { c: "#64748b", n: "Slate" },
  { c: "#1a1a1a", n: "Ink" },
  { c: "#22c55e", n: "Green" },
];

export default function Preview() {
  const { state, dispatch } = useApp();
  const [localAccent, setLocalAccent] = useState(state.accentColor);
  const [localTemplate, setLocalTemplate] = useState(state.selectedTemplate);
  const template = getTemplate(localTemplate);

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const el = document.getElementById("resume-download");
    if (!el) return;
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>Resume — ${[state.resume.personal.firstName, state.resume.personal.lastName].filter(Boolean).join(" ")}</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0;padding:0}body{background:white}</style></head><body>${el.outerHTML}</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-${[state.resume.personal.firstName, state.resume.personal.lastName].filter(Boolean).join("-").toLowerCase() || "resume"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={s.root}>
      <style>{`@media print { .no-print { display: none !important; } body { margin: 0; } }`}</style>

      {/* Header */}
      <header className={`${s.header} no-print`}>
        <button className={s.backBtn} onClick={() => dispatch({ type: "GO", screen: SCREENS.EDITOR })}>
          ← Back to Editor
        </button>
        <div className={s.logo}>
          <div className={s.logoMark}>RB</div>
          <span>Resume Builder</span>
        </div>
        <div className={s.headerRight}>
          <button className={s.printBtn} onClick={handlePrint}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z" />
            </svg>
            Print
          </button>
          <button className={s.downloadBtn} onClick={handleDownload}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download HTML
          </button>
        </div>
      </header>

      <div className={`${s.body} no-print`}>
        {/* Control panel */}
        <aside className={`${s.panel} no-print`}>
          <div className={s.panelSection}>
            <p className={s.panelTitle}>Switch Template</p>
            <div className={s.tplList}>
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  className={`${s.tplBtn} ${localTemplate === t.id ? s.tplActive : ""}`}
                  style={{ "--tc": localAccent }}
                  onClick={() => setLocalTemplate(t.id)}>
                  <div className={s.tplDot} style={{ background: localAccent, opacity: localTemplate === t.id ? 1 : 0.3 }} />
                  {t.name}
                  {localTemplate === t.id && <span className={s.tplCheck}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div className={s.divider} />

          <div className={s.panelSection}>
            <p className={s.panelTitle}>Accent Color</p>
            <div className={s.colorGrid}>
              {ACCENT_COLORS.map(({ c, n }) => (
                <button
                  key={c}
                  className={`${s.colorBtn} ${localAccent === c ? s.colorActive : ""}`}
                  style={{ background: c }}
                  title={n}
                  onClick={() => setLocalAccent(c)}
                />
              ))}
            </div>
          </div>

          <div className={s.divider} />

          <div className={s.panelSection}>
            <p className={s.panelTitle}>Resume Score</p>
            <div className={s.scoreCard}>
              <div className={s.scoreNum} style={{ color: "#22d3a5" }}>
                {Math.round(
                  (state.resume.personal.firstName ? 10 : 0) +
                    (state.resume.experience.length ? 20 : 0) +
                    (state.resume.education.length ? 15 : 0) +
                    (state.resume.skills.length ? 10 : 0) +
                    (state.resume.personal.summary?.length > 30 ? 15 : 0),
                )}
                %
              </div>
              <p className={s.scoreText}>Keep adding sections to strengthen your resume</p>
            </div>
          </div>

          <div className={s.divider} />

          <div className={s.panelSection}>
            <p className={s.panelTitle}>Pro Tips</p>
            {[
              "One page is usually best for 0-8 years experience",
              "Use quantifiable metrics in your experience",
              "Tailor your summary to each role",
              "ATS systems love clean formatting",
            ].map((t) => (
              <div key={t} className={s.tip}>
                <span>→</span>
                {t}
              </div>
            ))}
          </div>
        </aside>

        {/* Resume preview */}
        <main className={s.canvas}>
          <div className={s.canvasLabel}>Full Resume Preview</div>
          <div className={s.canvasScroll}>
            <div id="resume-download" style={{ width: 794, minHeight: 1123, background: "white" }}>
              {template && <ResumeEngine template={template} resume={state.resume} accentColor={localAccent} />}
            </div>
          </div>
        </main>
      </div>

      {/* Print only */}
      <div className={s.printOnly}>{template && <ResumeEngine template={template} resume={state.resume} accentColor={localAccent} />}</div>
    </div>
  );
}
