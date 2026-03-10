import React, { useState, useMemo } from "react";
import { useApp, SCREENS } from "../store/AppContext";
import { TEMPLATES, filterTemplates, getTemplate } from "../templates/templateDefs";
import ResumeEngine from "../engine/ResumeEngine";
import s from "./TemplatePicker.module.css";

const DEMO_RESUME = {
  personal: {
    firstName: "Saanvi",
    lastName: "Patel",
    title: "Senior Product Designer",
    email: "saanvi@email.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    country: "India",
    website: "",
    linkedin: "",
    summary:
      "Creative designer with 5+ years crafting digital experiences for leading tech companies. Passionate about user-centered design and building scalable design systems.",
    photo: null,
  },
  experience: [
    {
      id: 1,
      company: "Razorpay",
      position: "Senior Product Designer",
      location: "Bangalore",
      startMonth: "Jan",
      startYear: "2022",
      current: true,
      description: "• Led redesign of payment checkout flow\n• Increased conversion rate by 28%\n• Managed design system with 200+ components",
    },
    {
      id: 2,
      company: "Swiggy",
      position: "UX Designer",
      location: "Hyderabad",
      startMonth: "Mar",
      startYear: "2019",
      endYear: "2021",
      description: "• Designed consumer-facing app features\n• Conducted user research with 100+ participants",
    },
  ],
  education: [{ id: 1, school: "NID Ahmedabad", degree: "Bachelor's", field: "Industrial Design", startYear: "2015", endYear: "2019", gpa: "8.7/10" }],
  skills: [
    { id: 1, name: "Figma", level: "Expert" },
    { id: 2, name: "Prototyping", level: "Expert" },
    { id: 3, name: "User Research", level: "Advanced" },
    { id: 4, name: "Design Systems", level: "Advanced" },
    { id: 5, name: "React", level: "Intermediate" },
  ],
  languages: [
    { id: 1, name: "English", level: "Native / Bilingual" },
    { id: 2, name: "Hindi", level: "Native / Bilingual" },
  ],
  certifications: [{ id: 1, name: "Google UX Design Certificate", issuer: "Google / Coursera" }],
  projects: [],
};

const ACCENT_COLORS = ["#6c63ff", "#0ea5e9", "#22d3a5", "#f59e0b", "#f43f5e", "#a78bfa", "#ec4899", "#14b8a6", "#f97316", "#64748b"];

function TemplateThumbnail({ template, selected, accent, onSelect, onHover }) {
  const thumbResume = {
    ...DEMO_RESUME,
    personal: {
      ...DEMO_RESUME.personal,
      photo: template.tags.includes("with-photo")
        ? 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect fill="%23ddd" width="80" height="80" rx="40"/><text x="40" y="52" text-anchor="middle" font-size="32">👤</text></svg>'
        : null,
    },
  };

  return (
    <div
      className={`${s.thumb} ${selected ? s.thumbSelected : ""}`}
      style={{ "--tc": accent }}
      onClick={() => onSelect(template.id)}
      onMouseEnter={() => onHover(template.id)}>
      {/* Tiny scaled preview */}
      <div className={s.thumbPreview}>
        <div className={s.thumbScale}>
          <ResumeEngine template={template} resume={thumbResume} accentColor={accent} />
        </div>
      </div>
      <div className={s.thumbFooter}>
        <div className={s.thumbName}>{template.name}</div>
        <div className={s.thumbTags}>
          {template.tags
            .filter((t) => !["with-photo", "without-photo", "1-column", "2-column"].includes(t))
            .slice(0, 2)
            .map((t) => (
              <span key={t} className={s.thumbTag}>
                {t}
              </span>
            ))}
        </div>
      </div>
      {selected && <div className={s.thumbCheck}>✓</div>}
    </div>
  );
}

export default function TemplatePicker() {
  const { state, dispatch } = useApp();
  const [hovered, setHovered] = useState(null);
  const [localAccent, setLocalAccent] = useState(state.accentColor);
  const [filterOverride, setFilterOverride] = useState(null); // null = use prefs
  const [showAll, setShowAll] = useState(false);

  const recommended = useMemo(() => filterTemplates(state.prefs), [state.prefs]);

  const displayTemplates = useMemo(() => {
    // If a filter like 'modern' is clicked, use it exclusively
    if (filterOverride) {
      return TEMPLATES.filter((t) => t.tags.includes(filterOverride));
    }
    // If 'Reset' is clicked, show all
    if (showAll) return TEMPLATES;

    // Default state: Show ALL templates but sort recommended ones to the top if they exist
    const recommended = filterTemplates(state.prefs);
    if (recommended.length === 0) return TEMPLATES;

    // Sort logic: recommended first, then the rest
    const recIds = new Set(recommended.map((r) => r.id));
    const others = TEMPLATES.filter((t) => !recIds.has(t.id));
    return [...recommended, ...others];
  }, [showAll, filterOverride, state.prefs]);

  const selectedId = state.selectedTemplate || displayTemplates[0]?.id;
  const selectedTemplate = getTemplate(selectedId);

  const handleSelect = (id) => {
    dispatch({ type: "SET_TEMPLATE", payload: id });
    dispatch({ type: "SET_ACCENT", color: localAccent });
  };

  const handleUse = () => {
    dispatch({ type: "SET_TEMPLATE", payload: selectedId });
    dispatch({ type: "SET_ACCENT", color: localAccent });
    dispatch({ type: "GO", screen: SCREENS.EDITOR });
  };

  const previewResume = {
    ...DEMO_RESUME,
    personal: {
      ...DEMO_RESUME.personal,
      photo: selectedTemplate?.tags.includes("with-photo")
        ? 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect fill="%23ddd" width="80" height="80" rx="40"/><text x="40" y="52" text-anchor="middle" font-size="32">👤</text></svg>'
        : null,
    },
  };

  const FILTERS = [
    { id: "simple", label: "Simple" },
    { id: "modern", label: "Modern" },
    { id: "bold", label: "Bold" },
    { id: "contemporary", label: "Contemporary" },
    { id: "1-column", label: "1 Column" },
    { id: "2-column", label: "2 Column" },
  ];

  return (
    <div className={s.root}>
      {/* Header */}
      <header className={s.header}>
        <button className={s.backBtn} onClick={() => dispatch({ type: "GO", screen: SCREENS.ONBOARD_INDUSTRY })}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <div className={s.headerTitle}>
          <div className={s.logo}>
            <div className={s.logoMark}>RB</div>
            <span>Resume Builder</span>
          </div>
        </div>
        <button className={s.useBtn} onClick={handleUse} disabled={!selectedId}>
          Use This Template
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </header>

      <div className={s.body}>
        {/* Left panel — template list */}
        <div className={s.listPanel}>
          <div className={s.listHeader}>
            <h2 className={s.listTitle}>{displayTemplates.length} Templates</h2>
            <button
              className={s.showAllBtn}
              onClick={() => {
                setShowAll(true);
                setFilterOverride(null);
              }}>
              Reset
            </button>
          </div>

          {/* Filters */}
          <div className={s.filterRow}>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`${s.filterBtn} ${filterOverride === f.id ? s.filterActive : ""}`}
                onClick={() => setFilterOverride(f.id === filterOverride ? null : f.id)}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Accent color */}
          <div className={s.accentRow}>
            <span className={s.accentLabel}>Accent Color</span>
            <div className={s.accentColors}>
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c}
                  className={`${s.accentBtn} ${localAccent === c ? s.accentActive : ""}`}
                  style={{ background: c }}
                  onClick={() => setLocalAccent(c)}
                />
              ))}
            </div>
          </div>

          <div className={s.thumbGrid}>
            {displayTemplates.map((t) => (
              <TemplateThumbnail key={t.id} template={t} selected={selectedId === t.id} accent={localAccent} onSelect={handleSelect} onHover={setHovered} />
            ))}
          </div>
        </div>

        {/* Right panel — large preview */}
        <div className={s.previewPanel}>
          <div className={s.previewLabel}>
            <div className={s.previewDot} />
            Live Preview — {selectedTemplate?.name}
          </div>
          <div className={s.previewWrap}>
            <div className={s.previewPage}>
              {selectedTemplate && <ResumeEngine template={selectedTemplate} resume={previewResume} accentColor={localAccent} />}
            </div>
          </div>
          <div className={s.previewActions}>
            <button className={s.useBtn2} onClick={handleUse}>
              Use {selectedTemplate?.name} Template →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
