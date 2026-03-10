// ============================================================
// TEMPLATE DEFINITIONS — Pure JSON / config objects
// Each template is a pure data spec. The render engine reads
// these and produces the visual output. Add new templates by
// just adding objects here — no component code needed.
// ============================================================

export const TEMPLATES = [
  // ──────────────────────────────────────────────────────────
  // ATLAS — Clean two-column with colored sidebar
  // ──────────────────────────────────────────────────────────
  {
    id: "atlas",
    name: "Atlas",
    tags: ["contemporary", "2-column", "with-photo", "without-photo", "corporate", "healthcare", "software", "management"],
    layout: "sidebar-left",
    sidebarWidth: 240,
    fonts: { heading: "Inter", body: "Outfit" },
    palette: {
      sidebar: "#1e2a3a",
      sidebarText: "#ffffff",
      sidebarMuted: "rgba(255,255,255,0.55)",
      sidebarAccent: "{accent}",
      mainBg: "#ffffff",
      mainText: "#1a1a2e",
      mainMuted: "#666680",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: {
      sidebar: ["photo", "contact", "skills", "languages", "certifications"],
      main: ["nameBlock", "summary", "experience", "education", "projects"],
    },
    style: {
      sectionHeadStyle: "uppercase-bar", // renders as UPPERCASE with colored left bar
      expStyle: "timeline", // left-border timeline
      skillStyle: "bar", // filled progress bars
      photoStyle: "circle",
      nameSize: 26,
    },
  },

  // ──────────────────────────────────────────────────────────
  // NOVA — Full-bleed dark header, single column
  // ──────────────────────────────────────────────────────────
  {
    id: "nova",
    name: "Nova",
    tags: ["modern", "1-column", "without-photo", "software", "designer", "creative"],
    layout: "single",
    fonts: { heading: "Inter", body: "Outfit" },
    palette: {
      headerBg: "#0f172a",
      headerText: "#f8fafc",
      headerAccent: "{accent}",
      mainBg: "#ffffff",
      mainText: "#1e293b",
      mainMuted: "#64748b",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: {
      header: ["photo", "nameBlock", "contact"],
      main: ["summary", "experience", "education", "skills", "projects", "certifications", "languages"],
    },
    style: {
      sectionHeadStyle: "underline-accent",
      expStyle: "flat",
      skillStyle: "chips",
      photoStyle: "square-rounded",
      nameSize: 32,
    },
  },

  // ──────────────────────────────────────────────────────────
  // MERIDIAN — Executive serif, gold accents, single col
  // ──────────────────────────────────────────────────────────
  {
    id: "meridian",
    name: "Meridian",
    tags: ["traditional", "simple", "1-column", "without-photo", "management", "finance", "legal", "executive"],
    layout: "single",
    fonts: { heading: "Inter", body: "Outfit" },
    palette: {
      headerBg: "#f8f5ef",
      headerText: "#1c160a",
      headerAccent: "#c9952a",
      mainBg: "#ffffff",
      mainText: "#1c160a",
      mainMuted: "#7a6a4a",
      accent: "#c9952a",
      headingBorder: "#c9952a",
    },
    sections: {
      header: ["nameBlock", "contact"],
      main: ["summary", "experience", "education", "skills", "certifications", "languages"],
    },
    style: {
      sectionHeadStyle: "serif-divider",
      expStyle: "flat",
      skillStyle: "dots",
      photoStyle: "none",
      nameSize: 38,
    },
  },

  // ──────────────────────────────────────────────────────────
  // PRISM — Bold two-col, right sidebar, creative
  // ──────────────────────────────────────────────────────────
  {
    id: "prism",
    name: "Prism",
    tags: ["bold", "2-column", "with-photo", "without-photo", "designer", "creative", "marketing"],
    layout: "sidebar-right",
    sidebarWidth: 230,
    fonts: { heading: "Inter", body: "Outfit" },
    palette: {
      sidebar: "{accent}",
      sidebarText: "#ffffff",
      sidebarMuted: "rgba(255,255,255,0.7)",
      sidebarAccent: "#ffffff",
      mainBg: "#0f0f17",
      mainText: "#e8e8f0",
      mainMuted: "#8888aa",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: {
      sidebar: ["photo", "contact", "skills", "languages"],
      main: ["nameBlock", "summary", "experience", "education", "projects", "certifications"],
    },
    style: {
      sectionHeadStyle: "bold-label",
      expStyle: "card",
      skillStyle: "bar",
      photoStyle: "circle",
      nameSize: 28,
    },
  },

  // ──────────────────────────────────────────────────────────
  // HORIZON — Clean minimal, ATS-safe, 1-col
  // ──────────────────────────────────────────────────────────
  {
    id: "horizon",
    name: "Horizon",
    tags: ["simple", "1-column", "without-photo", "healthcare", "teacher", "government", "ats"],
    layout: "single",
    fonts: { heading: "Inter", body: "Outfit" },
    palette: {
      headerBg: "#ffffff",
      headerText: "#111111",
      headerAccent: "{accent}",
      mainBg: "#ffffff",
      mainText: "#111111",
      mainMuted: "#555555",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: {
      header: ["nameBlock", "contact"],
      main: ["summary", "experience", "education", "skills", "certifications", "languages", "projects"],
    },
    style: {
      sectionHeadStyle: "simple-line",
      expStyle: "minimal",
      skillStyle: "inline-list",
      photoStyle: "none",
      nameSize: 30,
    },
  },

  // ──────────────────────────────────────────────────────────
  // VERTEX — Dark tech, code aesthetic, 2-col
  // ──────────────────────────────────────────────────────────
  {
    id: "vertex",
    name: "Vertex",
    tags: ["bold", "2-column", "without-photo", "software", "engineering", "devops", "tech"],
    layout: "sidebar-left",
    sidebarWidth: 220,
    fonts: { heading: "DM Mono", body: "Outfit" },
    palette: {
      sidebar: "#0d1117",
      sidebarText: "#e6edf3",
      sidebarMuted: "#8b949e",
      sidebarAccent: "{accent}",
      mainBg: "#161b22",
      mainText: "#e6edf3",
      mainMuted: "#8b949e",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: {
      sidebar: ["contact", "skills", "languages", "certifications"],
      main: ["nameBlock", "summary", "experience", "education", "projects"],
    },
    style: {
      sectionHeadStyle: "code-comment",
      expStyle: "bordered-card",
      skillStyle: "tag",
      photoStyle: "none",
      nameSize: 24,
    },
  },

  // ──────────────────────────────────────────────────────────
  // BLOOM — Soft pastel, healthcare / teacher friendly
  // ──────────────────────────────────────────────────────────
  {
    id: "bloom",
    name: "Bloom",
    tags: ["simple", "1-column", "with-photo", "healthcare", "teacher", "education", "nonprofit"],
    layout: "single",
    fonts: { heading: "Inter", body: "Outfit" },
    palette: {
      headerBg: "#faf5ff",
      headerText: "#2d1b5c",
      headerAccent: "{accent}",
      mainBg: "#ffffff",
      mainText: "#2d1b5c",
      mainMuted: "#7c6b9a",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: {
      header: ["photo", "nameBlock", "contact"],
      main: ["summary", "experience", "education", "skills", "certifications", "languages"],
    },
    style: {
      sectionHeadStyle: "pill-head",
      expStyle: "soft-card",
      skillStyle: "pill-chips",
      photoStyle: "circle-border",
      nameSize: 30,
    },
  },

  // ──────────────────────────────────────────────────────────
  // SLATE — Newspaper editorial, bold typographic
  // ──────────────────────────────────────────────────────────
  {
    id: "slate",
    name: "Slate",
    tags: ["bold", "2-column", "without-photo", "marketing", "media", "journalism", "management"],
    layout: "sidebar-left",
    sidebarWidth: 200,
    fonts: { heading: "Inter", body: "Outfit" },
    palette: {
      sidebar: "#f5f5f5",
      sidebarText: "#111111",
      sidebarMuted: "#555555",
      sidebarAccent: "{accent}",
      mainBg: "#ffffff",
      mainText: "#111111",
      mainMuted: "#555555",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: {
      sidebar: ["contact", "skills", "languages", "certifications"],
      main: ["nameBlock", "summary", "experience", "education", "projects"],
    },
    style: {
      sectionHeadStyle: "editorial",
      expStyle: "flat",
      skillStyle: "dot-list",
      photoStyle: "none",
      nameSize: 34,
    },
  },

  // ──────────────────────────────────────────────────────────
  // LUMINA — High-end minimal, ultra-clean whitespace
  // ──────────────────────────────────────────────────────────
  {
    id: "lumina",
    name: "Lumina",
    tags: ["modern", "1-column", "without-photo", "corporate", "healthcare", "management", "ats"],
    layout: "single",
    fonts: { heading: "Inter", body: "Outfit" },
    palette: {
      headerBg: "#ffffff",
      headerText: "#000000",
      headerAccent: "{accent}",
      mainBg: "#ffffff",
      mainText: "#1a1a1a",
      mainMuted: "#666666",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: {
      header: ["nameBlock", "contact"],
      main: ["summary", "experience", "education", "skills", "certifications"],
    },
    style: {
      sectionHeadStyle: "uppercase-bar",
      expStyle: "minimal",
      skillStyle: "inline-list",
      photoStyle: "none",
      nameSize: 28,
    },
  },

  // ──────────────────────────────────────────────────────────
  // ORACLE — Tech-noir, dark aesthetic with vibrant accents
  // ──────────────────────────────────────────────────────────
  {
    id: "oracle",
    name: "Oracle",
    tags: ["bold", "2-column", "without-photo", "software", "engineering", "tech", "creative"],
    layout: "sidebar-left",
    sidebarWidth: 220,
    fonts: { heading: "DM Mono", body: "Outfit" },
    palette: {
      sidebar: "#0a0a0f",
      sidebarText: "#e0e0ff",
      sidebarMuted: "#606080",
      sidebarAccent: "{accent}",
      mainBg: "#0f0f1a",
      mainText: "#f0f0f5",
      mainMuted: "#9090b0",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: {
      sidebar: ["contact", "skills", "languages"],
      main: ["nameBlock", "summary", "experience", "projects", "education"],
    },
    style: {
      sectionHeadStyle: "code-comment",
      expStyle: "bordered-card",
      skillStyle: "tag",
      photoStyle: "none",
      nameSize: 26,
    },
  },

  // ──────────────────────────────────────────────────────────
  // ETHEREAL — Elegant soft-focus, pill-based design
  // ──────────────────────────────────────────────────────────
  {
    id: "ethereal",
    name: "Ethereal",
    tags: ["simple", "1-column", "with-photo", "healthcare", "teacher", "education", "creative"],
    layout: "single",
    fonts: { heading: "Inter", body: "Outfit" },
    palette: {
      headerBg: "#fdfbff",
      headerText: "#4a3a6a",
      headerAccent: "{accent}",
      mainBg: "#ffffff",
      mainText: "#4a3a6a",
      mainMuted: "#7c6a9a",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: {
      header: ["photo", "nameBlock", "contact"],
      main: ["summary", "experience", "education", "skills", "languages"],
    },
    style: {
      sectionHeadStyle: "pill-head",
      expStyle: "soft-card",
      skillStyle: "pill-chips",
      photoStyle: "circle-border",
      nameSize: 32,
    },
  },

  // ──────────────────────────────────────────────────────────
  // VANGUARD — Asymmetrical creative, high impact
  // ──────────────────────────────────────────────────────────
  {
    id: "vanguard",
    name: "Vanguard",
    tags: ["bold", "2-column", "with-photo", "designer", "creative", "marketing", "media"],
    layout: "sidebar-right",
    sidebarWidth: 260,
    fonts: { heading: "Inter", body: "Outfit" },
    palette: {
      sidebar: "#111111",
      sidebarText: "#ffffff",
      sidebarMuted: "rgba(255,255,255,0.6)",
      sidebarAccent: "{accent}",
      mainBg: "#ffffff",
      mainText: "#111111",
      mainMuted: "#444444",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: {
      sidebar: ["photo", "contact", "skills", "languages", "certifications"],
      main: ["nameBlock", "summary", "experience", "education", "projects"],
    },
    style: {
      sectionHeadStyle: "bold-label",
      expStyle: "card",
      skillStyle: "bar",
      photoStyle: "square-rounded",
      nameSize: 34,
    },
  },

  // 13. ZENITH — Ultra minimal, centered header
  {
    id: "zenith",
    name: "Zenith",
    tags: ["simple", "1-column", "without-photo", "healthcare", "legal", "finance", "ats"],
    layout: "single",
    fonts: { heading: "Inter", body: "Outfit" },
    palette: { headerBg: "#ffffff", headerText: "#000", mainBg: "#ffffff", mainText: "#222", mainMuted: "#777", accent: "{accent}", headingBorder: "#eee" },
    sections: { header: ["nameBlock", "contact"], main: ["summary", "experience", "education", "skills"] },
    style: { sectionHeadStyle: "simple-line", expStyle: "minimal", skillStyle: "inline-list", photoStyle: "none", nameSize: 32 },
  },

  // 14. TITAN — Bold, blocky, corporate
  {
    id: "titan",
    name: "Titan",
    tags: ["bold", "2-column", "without-photo", "management", "corporate", "finance"],
    layout: "sidebar-left",
    sidebarWidth: 240,
    fonts: { heading: "Inter", body: "Outfit" },
    palette: { sidebar: "#1a1a1a", sidebarText: "#fff", mainBg: "#fff", mainText: "#111", mainMuted: "#555", accent: "{accent}", headingBorder: "{accent}" },
    sections: { sidebar: ["contact", "skills", "certifications"], main: ["nameBlock", "summary", "experience", "education"] },
    style: { sectionHeadStyle: "bold-label", expStyle: "bordered-card", skillStyle: "bar", photoStyle: "none", nameSize: 30 },
  },

  // 15. GLOSS — Clean, tech-focused with underlined headings
  {
    id: "gloss",
    name: "Gloss",
    tags: ["modern", "1-column", "without-photo", "software", "engineering", "tech"],
    layout: "single",
    fonts: { heading: "Inter", body: "Outfit" },
    palette: {
      headerBg: "#f8fbfc",
      headerText: "#1c1e21",
      mainBg: "#fff",
      mainText: "#1c1e21",
      mainMuted: "#586069",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: { header: ["nameBlock", "contact"], main: ["summary", "experience", "education", "skills", "projects"] },
    style: { sectionHeadStyle: "underline-accent", expStyle: "flat", skillStyle: "chips", photoStyle: "none", nameSize: 28 },
  },

  // 16. RETRO — Monospace focus, typewritten feel
  {
    id: "retro",
    name: "Retro",
    tags: ["bold", "1-column", "without-photo", "software", "writer", "media"],
    layout: "single",
    fonts: { heading: "DM Mono", body: "DM Mono" },
    palette: { headerBg: "#fff", headerText: "#111", mainBg: "#fff", mainText: "#111", mainMuted: "#666", accent: "{accent}", headingBorder: "#111" },
    sections: { header: ["nameBlock", "contact"], main: ["summary", "experience", "education", "skills"] },
    style: { sectionHeadStyle: "code-comment", expStyle: "minimal", skillStyle: "tag", photoStyle: "none", nameSize: 24 },
  },

  // 17. NOCTURNAL — Deep dark mode
  {
    id: "nocturnal",
    name: "Nocturnal",
    tags: ["bold", "2-column", "without-photo", "software", "engineering", "creative"],
    layout: "sidebar-right",
    sidebarWidth: 220,
    fonts: { heading: "Inter", body: "Outfit" },
    palette: { sidebar: "#000", sidebarText: "#fff", mainBg: "#111", mainText: "#eee", mainMuted: "#aaa", accent: "{accent}", headingBorder: "{accent}" },
    sections: { sidebar: ["contact", "skills", "languages"], main: ["nameBlock", "summary", "experience", "projects"] },
    style: { sectionHeadStyle: "bold-label", expStyle: "card", skillStyle: "tag", photoStyle: "none", nameSize: 32 },
  },

  // 18. SYNERGY — Connected nodes / timeline
  {
    id: "synergy",
    name: "Synergy",
    tags: ["modern", "2-column", "with-photo", "corporate", "management", "marketing"],
    layout: "sidebar-left",
    sidebarWidth: 230,
    fonts: { heading: "Inter", body: "Outfit" },
    palette: {
      sidebar: "#f0f4f8",
      sidebarText: "#243b53",
      mainBg: "#fff",
      mainText: "#243b53",
      mainMuted: "#627d98",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: { sidebar: ["photo", "contact", "skills", "languages"], main: ["nameBlock", "summary", "experience", "education"] },
    style: { sectionHeadStyle: "uppercase-bar", expStyle: "timeline", skillStyle: "dots", photoStyle: "circle-border", nameSize: 26 },
  },

  // 19. ASPIRATION — Traditional but clean
  {
    id: "aspiration",
    name: "Aspiration",
    tags: ["simple", "1-column", "without-photo", "teacher", "healthcare", "ats"],
    layout: "single",
    fonts: { heading: "Inter", body: "Outfit" },
    palette: { headerBg: "#ffffff", headerText: "#111", mainBg: "#ffffff", mainText: "#111", mainMuted: "#555", accent: "{accent}", headingBorder: "{accent}" },
    sections: { header: ["nameBlock", "contact"], main: ["summary", "experience", "education", "skills", "certifications"] },
    style: { sectionHeadStyle: "serif-divider", expStyle: "flat", skillStyle: "dot-list", photoStyle: "none", nameSize: 34 },
  },

  // 20. MOSAIC — Structured grid feel
  {
    id: "mosaic",
    name: "Mosaic",
    tags: ["modern", "2-column", "with-photo", "designer", "creative", "software"],
    layout: "sidebar-left",
    sidebarWidth: 260,
    fonts: { heading: "Inter", body: "Outfit" },
    palette: { sidebar: "#f5f5f5", sidebarText: "#333", mainBg: "#fff", mainText: "#111", mainMuted: "#666", accent: "{accent}", headingBorder: "{accent}" },
    sections: { sidebar: ["photo", "contact", "skills", "languages"], main: ["nameBlock", "summary", "experience", "projects", "education"] },
    style: { sectionHeadStyle: "bold-label", expStyle: "soft-card", skillStyle: "chips", photoStyle: "square-rounded", nameSize: 28 },
  },

  // 21. VELOCITY — Sporty, fast-paced look
  {
    id: "velocity",
    name: "Velocity",
    tags: ["bold", "1-column", "without-photo", "marketing", "sales", "media"],
    layout: "single",
    fonts: { heading: "Inter", body: "Outfit" },
    palette: { headerBg: "{accent}", headerText: "#fff", mainBg: "#fff", mainText: "#111", mainMuted: "#555", accent: "{accent}", headingBorder: "{accent}" },
    sections: { header: ["nameBlock", "contact"], main: ["summary", "experience", "skills", "projects"] },
    style: { sectionHeadStyle: "uppercase-bar", expStyle: "card", skillStyle: "pill-chips", photoStyle: "none", nameSize: 36 },
  },

  // 22. ESSENCE — Ultra clean, light serif headings
  {
    id: "essence",
    name: "Essence",
    tags: ["simple", "1-column", "without-photo", "healthcare", "legal", "executive"],
    layout: "single",
    fonts: { heading: "Inter", body: "Outfit" },
    palette: { headerBg: "#fff", headerText: "#111", mainBg: "#fff", mainText: "#333", mainMuted: "#777", accent: "{accent}", headingBorder: "#ccc" },
    sections: { header: ["nameBlock", "contact"], main: ["summary", "experience", "education", "skills"] },
    style: { sectionHeadStyle: "serif-divider", expStyle: "minimal", skillStyle: "inline-list", photoStyle: "none", nameSize: 30 },
  },

  // 23. COBALT — Deep professional blue
  {
    id: "cobalt",
    name: "Cobalt",
    tags: ["corporate", "2-column", "without-photo", "finance", "management", "engineering"],
    layout: "sidebar-left",
    sidebarWidth: 220,
    fonts: { heading: "Inter", body: "Outfit" },
    palette: { sidebar: "#002b5c", sidebarText: "#fff", mainBg: "#fff", mainText: "#111", mainMuted: "#555", accent: "#004aa3", headingBorder: "#004aa3" },
    sections: { sidebar: ["contact", "skills", "certifications"], main: ["nameBlock", "summary", "experience", "education"] },
    style: { sectionHeadStyle: "uppercase-bar", expStyle: "flat", skillStyle: "bar", photoStyle: "none", nameSize: 26 },
  },

  // 24. ORCHID — Soft, elegant touches
  {
    id: "orchid",
    name: "Orchid",
    tags: ["simple", "1-column", "with-photo", "education", "nonprofit", "creative"],
    layout: "single",
    fonts: { heading: "Inter", body: "Outfit" },
    palette: {
      headerBg: "#fff0f6",
      headerText: "#6a0b37",
      mainBg: "#fff",
      mainText: "#6a0b37",
      mainMuted: "#9e5a7a",
      accent: "{accent}",
      headingBorder: "{accent}",
    },
    sections: { header: ["photo", "nameBlock", "contact"], main: ["summary", "experience", "education", "skills"] },
    style: { sectionHeadStyle: "pill-head", expStyle: "soft-card", skillStyle: "pill-chips", photoStyle: "circle-border", nameSize: 28 },
  },

  // 25. CARBON — Dark headers, industrial tech
  {
    id: "carbon",
    name: "Carbon",
    tags: ["bold", "1-column", "without-photo", "engineering", "tech", "software"],
    layout: "single",
    fonts: { heading: "Inter", body: "Outfit" },
    palette: { headerBg: "#222", headerText: "#fff", mainBg: "#fff", mainText: "#111", mainMuted: "#555", accent: "{accent}", headingBorder: "{accent}" },
    sections: { header: ["nameBlock", "contact"], main: ["summary", "experience", "skills", "education", "certifications"] },
    style: { sectionHeadStyle: "bold-label", expStyle: "bordered-card", skillStyle: "tag", photoStyle: "none", nameSize: 32 },
  },
];

// Filter helpers
export function filterTemplates(prefs) {
  return TEMPLATES.filter((t) => {
    const tags = t.tags;
    // Only filter strictly on photo/columns if specifically asked
    if (prefs.withPhoto === true && !tags.includes("with-photo")) return false;
    if (prefs.withPhoto === false && !tags.includes("without-photo")) return false;
    if (prefs.columns === 1 && !tags.includes("1-column")) return false;
    if (prefs.columns === 2 && !tags.includes("2-column")) return false;

    // For style and industry, we want to be more inclusive.
    // If a template matches EITHER the style OR the industry, we keep it.
    if (prefs.style || prefs.industry) {
      const matchStyle = prefs.style ? tags.includes(prefs.style) : false;
      const matchIndustry = prefs.industry ? tags.includes(prefs.industry) : false;
      if (!matchStyle && !matchIndustry) return false;
    }

    return true;
  });
}

export function getTemplate(id) {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
}
