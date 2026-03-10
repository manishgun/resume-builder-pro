import React, { useState, useRef } from "react";
import { useApp, SCREENS } from "../store/AppContext";
import { getTemplate } from "../templates/templateDefs";
import ResumeEngine from "../engine/ResumeEngine";
import s from "./Editor.module.css";

// ── Helpers ──────────────────────────────────────────────────
const blank = (sec) =>
  ({
    experience: () => ({
      id: Date.now(),
      company: "",
      position: "",
      location: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      current: false,
      description: "",
    }),
    education: () => ({ id: Date.now(), school: "", degree: "", field: "", startYear: "", endYear: "", current: false, gpa: "", description: "" }),
    skills: () => null,
    languages: () => null,
    certifications: () => ({ id: Date.now(), name: "", issuer: "", date: "" }),
    projects: () => ({ id: Date.now(), name: "", role: "", technologies: "", url: "", description: "" }),
  })[sec]?.();

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const YEARS = Array.from({ length: 40 }, (_, i) => String(new Date().getFullYear() - i));
const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const LANG_LEVELS = ["Elementary", "Limited Working", "Professional Working", "Full Professional", "Native / Bilingual"];
const DEGREES = ["High School", "Diploma", "Associate", "Bachelor's", "Master's", "MBA", "Ph.D", "Other"];
const INDUSTRIES_TITLES = {
  software: ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "Data Scientist"],
  designer: ["UX Designer", "Product Designer", "Graphic Designer", "UI Designer", "Creative Director"],
  management: ["Project Manager", "Product Manager", "Operations Manager", "General Manager", "CEO", "Director"],
  marketing: ["Marketing Manager", "Digital Marketer", "Brand Manager", "Content Strategist", "SEO Specialist"],
  finance: ["Financial Analyst", "Accountant", "Investment Banker", "CFO", "Risk Manager"],
  healthcare: ["Doctor", "Nurse", "Healthcare Admin", "Medical Researcher", "Pharmacist"],
  teacher: ["Teacher", "Professor", "Instructor", "Academic Counselor", "Principal"],
  other: [],
};

function Field({ label, hint, children, required }) {
  return (
    <div className={s.field}>
      <label className={s.label}>
        {label}
        {required && <span className={s.req}>*</span>}
      </label>
      {children}
      {hint && <span className={s.hint}>{hint}</span>}
    </div>
  );
}

// ── SECTIONS ─────────────────────────────────────────────────
function PersonalForm() {
  const { state, dispatch } = useApp();
  const p = state.resume.personal;
  const fileRef = useRef();
  const u = (k, v) => dispatch({ type: "UPD_PERSONAL", payload: { [k]: v } });
  const suggestedTitles = INDUSTRIES_TITLES[state.prefs.industry] || [];

  return (
    <div className={s.formBlock}>
      <h2 className={s.formTitle}>Personal Information</h2>

      {/* Photo */}
      <div className={s.photoRow}>
        <div className={s.photoPreview}>{p.photo ? <img src={p.photo} alt="" /> : <span>👤</span>}</div>
        <div>
          <p className={s.photoTitle}>
            Profile Photo <span className={s.optBadge}>Optional</span>
          </p>
          <p className={s.photoSub}>JPG or PNG, min 200×200px</p>
          <div className={s.photoBtns}>
            <button className={s.outlineBtn} onClick={() => fileRef.current.click()}>
              Upload Photo
            </button>
            {p.photo && (
              <button className={s.ghostBtn} onClick={() => u("photo", null)}>
                Remove
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files[0];
              if (!f) return;
              const r = new FileReader();
              r.onload = (ev) => u("photo", ev.target.result);
              r.readAsDataURL(f);
            }}
          />
        </div>
      </div>

      <div className={s.row2}>
        <Field label="First Name" required>
          <input className={s.input} placeholder="Saanvi" value={p.firstName} onChange={(e) => u("firstName", e.target.value)} />
        </Field>
        <Field label="Last Name" required>
          <input className={s.input} placeholder="Patel" value={p.lastName} onChange={(e) => u("lastName", e.target.value)} />
        </Field>
      </div>

      <Field label="Professional Title">
        <input
          className={s.input}
          placeholder="e.g. Senior Product Designer"
          value={p.title}
          onChange={(e) => u("title", e.target.value)}
          list="title-suggest"
        />
        <datalist id="title-suggest">
          {suggestedTitles.map((t) => (
            <option key={t} value={t} />
          ))}
        </datalist>
      </Field>

      <div className={s.row2}>
        <Field label="Email" required>
          <input className={s.input} type="email" placeholder="you@email.com" value={p.email} onChange={(e) => u("email", e.target.value)} />
        </Field>
        <Field label="Phone">
          <input className={s.input} placeholder="+91 98765 43210" value={p.phone} onChange={(e) => u("phone", e.target.value)} />
        </Field>
      </div>

      <div className={s.row3}>
        <Field label="City">
          <input className={s.input} placeholder="Mumbai" value={p.city} onChange={(e) => u("city", e.target.value)} />
        </Field>
        <Field label="Country">
          <input className={s.input} placeholder="India" value={p.country} onChange={(e) => u("country", e.target.value)} />
        </Field>
        <Field label="PIN / ZIP">
          <input className={s.input} placeholder="400001" value={p.pinCode} onChange={(e) => u("pinCode", e.target.value)} />
        </Field>
      </div>

      <div className={s.row2}>
        <Field label="Website / Portfolio">
          <input className={s.input} placeholder="https://..." value={p.website} onChange={(e) => u("website", e.target.value)} />
        </Field>
        <Field label="LinkedIn URL">
          <input className={s.input} placeholder="linkedin.com/in/..." value={p.linkedin} onChange={(e) => u("linkedin", e.target.value)} />
        </Field>
      </div>

      <Field label="Professional Summary" hint={`${p.summary?.length || 0}/600 chars — Aim for 3-4 impactful sentences`}>
        <textarea
          className={s.textarea}
          rows={5}
          maxLength={600}
          placeholder="Describe your professional background, key strengths, and career goals in 3-4 sentences..."
          value={p.summary}
          onChange={(e) => u("summary", e.target.value)}
        />
      </Field>
    </div>
  );
}

function ExpForm() {
  const { state, dispatch } = useApp();
  const items = state.resume.experience;
  const [open, setOpen] = useState(0);
  const addItem = () => {
    dispatch({ type: "ADD_ITEM", sec: "experience", item: blank("experience") });
    setOpen(items.length);
  };
  const u = (i, payload) => dispatch({ type: "UPD_ITEM", sec: "experience", idx: i, payload });
  const del = (i) => dispatch({ type: "DEL_ITEM", sec: "experience", idx: i });

  return (
    <div className={s.formBlock}>
      <h2 className={s.formTitle}>Work Experience</h2>
      {items.map((exp, i) => (
        <div key={exp.id} className={s.itemCard}>
          <div className={s.itemHeader} onClick={() => setOpen(open === i ? -1 : i)}>
            <div>
              <div className={s.itemTitle}>{exp.position || exp.company || "New Experience"}</div>
              <div className={s.itemSub}>
                {[exp.company, exp.startYear && `${exp.startYear}–${exp.current ? "Present" : exp.endYear || "?"}`].filter(Boolean).join(" · ")}
              </div>
            </div>
            <div className={s.itemActions} onClick={(e) => e.stopPropagation()}>
              <button className={s.iconBtn} onClick={() => setOpen(open === i ? -1 : i)}>
                {open === i ? "▲" : "▼"}
              </button>
              <button className={`${s.iconBtn} ${s.danger}`} onClick={() => del(i)}>
                ✕
              </button>
            </div>
          </div>
          {open === i && (
            <div className={s.itemBody}>
              <div className={s.row2}>
                <Field label="Job Title" required>
                  <input className={s.input} placeholder="Software Engineer" value={exp.position} onChange={(e) => u(i, { position: e.target.value })} />
                </Field>
                <Field label="Company" required>
                  <input className={s.input} placeholder="Google" value={exp.company} onChange={(e) => u(i, { company: e.target.value })} />
                </Field>
              </div>
              <Field label="Location">
                <input className={s.input} placeholder="Bangalore, India" value={exp.location} onChange={(e) => u(i, { location: e.target.value })} />
              </Field>
              <div className={s.row2}>
                <Field label="Start">
                  <div className={s.dateRow}>
                    <select className={s.select} value={exp.startMonth} onChange={(e) => u(i, { startMonth: e.target.value })}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                    <select className={s.select} value={exp.startYear} onChange={(e) => u(i, { startYear: e.target.value })}>
                      <option value="">Year</option>
                      {YEARS.map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </Field>
                <Field label="End">
                  <div className={s.dateRow}>
                    <select className={s.select} value={exp.endMonth} onChange={(e) => u(i, { endMonth: e.target.value })} disabled={exp.current}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                    <select className={s.select} value={exp.endYear} onChange={(e) => u(i, { endYear: e.target.value })} disabled={exp.current}>
                      <option value="">Year</option>
                      {YEARS.map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <label className={s.checkLabel}>
                    <input type="checkbox" checked={exp.current} onChange={(e) => u(i, { current: e.target.checked })} /> Currently working here
                  </label>
                </Field>
              </div>
              <Field label="Description" hint="Use • bullet points. Start with action verbs. Include metrics.">
                <textarea
                  className={s.textarea}
                  rows={4}
                  placeholder="• Led development of core API services, improving response time by 40%&#10;• Managed team of 5 engineers across 3 sprints"
                  value={exp.description}
                  onChange={(e) => u(i, { description: e.target.value })}
                />
              </Field>
            </div>
          )}
        </div>
      ))}
      <button className={s.addBtn} onClick={addItem}>
        + Add Work Experience
      </button>
    </div>
  );
}

function EduForm() {
  const { state, dispatch } = useApp();
  const items = state.resume.education;
  const [open, setOpen] = useState(0);
  const addItem = () => {
    dispatch({ type: "ADD_ITEM", sec: "education", item: blank("education") });
    setOpen(items.length);
  };
  const u = (i, p) => dispatch({ type: "UPD_ITEM", sec: "education", idx: i, payload: p });
  const del = (i) => dispatch({ type: "DEL_ITEM", sec: "education", idx: i });

  return (
    <div className={s.formBlock}>
      <h2 className={s.formTitle}>Education</h2>
      {items.map((edu, i) => (
        <div key={edu.id} className={s.itemCard}>
          <div className={s.itemHeader} onClick={() => setOpen(open === i ? -1 : i)}>
            <div>
              <div className={s.itemTitle}>{[edu.degree, edu.field].filter(Boolean).join(" in ") || "New Education"}</div>
              <div className={s.itemSub}>
                {[edu.school, edu.startYear && `${edu.startYear}–${edu.current ? "Present" : edu.endYear}`].filter(Boolean).join(" · ")}
              </div>
            </div>
            <div className={s.itemActions} onClick={(e) => e.stopPropagation()}>
              <button className={s.iconBtn} onClick={() => setOpen(open === i ? -1 : i)}>
                {open === i ? "▲" : "▼"}
              </button>
              <button className={`${s.iconBtn} ${s.danger}`} onClick={() => del(i)}>
                ✕
              </button>
            </div>
          </div>
          {open === i && (
            <div className={s.itemBody}>
              <div className={s.row2}>
                <Field label="School / University">
                  <input className={s.input} placeholder="IIT Bombay" value={edu.school} onChange={(e) => u(i, { school: e.target.value })} />
                </Field>
                <Field label="Degree">
                  <select className={s.select} value={edu.degree} onChange={(e) => u(i, { degree: e.target.value })}>
                    <option value="">Select...</option>
                    {DEGREES.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className={s.row2}>
                <Field label="Field of Study">
                  <input className={s.input} placeholder="Computer Science" value={edu.field} onChange={(e) => u(i, { field: e.target.value })} />
                </Field>
                <Field label="GPA / Grade">
                  <input className={s.input} placeholder="8.5/10 or 3.8/4.0" value={edu.gpa} onChange={(e) => u(i, { gpa: e.target.value })} />
                </Field>
              </div>
              <div className={s.row2}>
                <Field label="Start Year">
                  <select className={s.select} value={edu.startYear} onChange={(e) => u(i, { startYear: e.target.value })}>
                    <option value="">Year</option>
                    {YEARS.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </Field>
                <Field label="End Year">
                  <select className={s.select} value={edu.endYear} onChange={(e) => u(i, { endYear: e.target.value })} disabled={edu.current}>
                    <option value="">Year</option>
                    {YEARS.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                  <label className={s.checkLabel}>
                    <input type="checkbox" checked={edu.current} onChange={(e) => u(i, { current: e.target.checked })} /> Currently studying
                  </label>
                </Field>
              </div>
            </div>
          )}
        </div>
      ))}
      <button className={s.addBtn} onClick={addItem}>
        + Add Education
      </button>
    </div>
  );
}

function SkillsForm() {
  const { state, dispatch } = useApp();
  const skills = state.resume.skills;
  const [input, setInput] = useState("");
  const [level, setLevel] = useState("Intermediate");
  const SUGGESTED = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "SQL",
    "Git",
    "AWS",
    "Docker",
    "TypeScript",
    "Java",
    "Figma",
    "Excel",
    "Photoshop",
    "Communication",
    "Leadership",
    "Agile",
    "REST APIs",
    "Machine Learning",
  ];

  const add = (name) => {
    const n = (name || input).trim();
    if (!n || skills.find((sk) => sk.name.toLowerCase() === n.toLowerCase())) return;
    dispatch({ type: "ADD_ITEM", sec: "skills", item: { id: Date.now(), name: n, level } });
    setInput("");
  };

  return (
    <div className={s.formBlock}>
      <h2 className={s.formTitle}>Skills</h2>
      <Field label="Skill Level">
        <div className={s.levelRow}>
          {SKILL_LEVELS.map((l) => (
            <button key={l} className={`${s.levelBtn} ${level === l ? s.levelActive : ""}`} onClick={() => setLevel(l)}>
              {l}
            </button>
          ))}
        </div>
      </Field>
      <div className={s.addRow}>
        <input
          className={s.input}
          placeholder="Type a skill and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <button className={s.solidBtn} onClick={() => add()}>
          Add
        </button>
      </div>
      {skills.length > 0 && (
        <div className={s.chips}>
          {skills.map((sk, i) => (
            <span key={sk.id} className={s.chip}>
              {sk.name} <span className={s.chipLevel}>{sk.level}</span>
              <button className={s.chipDel} onClick={() => dispatch({ type: "DEL_ITEM", sec: "skills", idx: i })}>
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <div className={s.suggestWrap}>
        <p className={s.suggestLabel}>Suggestions</p>
        <div className={s.suggests}>
          {SUGGESTED.filter((sg) => !skills.find((sk) => sk.name === sg))
            .slice(0, 10)
            .map((sg) => (
              <button key={sg} className={s.suggestBtn} onClick={() => add(sg)}>
                + {sg}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

function LangForm() {
  const { state, dispatch } = useApp();
  const langs = state.resume.languages;
  const [lang, setLang] = useState("");
  const [level, setLevel] = useState("Professional Working");
  const COMMON = ["English", "Hindi", "Bengali", "Marathi", "Tamil", "Telugu", "Gujarati", "French", "Spanish", "German", "Mandarin", "Arabic"];
  const add = (n) => {
    const name = (n || lang).trim();
    if (!name || langs.find((l) => l.name === name)) return;
    dispatch({ type: "ADD_ITEM", sec: "languages", item: { id: Date.now(), name, level } });
    setLang("");
  };

  return (
    <div className={s.formBlock}>
      <h2 className={s.formTitle}>Languages</h2>
      <Field label="Proficiency Level">
        <select className={s.select} value={level} onChange={(e) => setLevel(e.target.value)}>
          {LANG_LEVELS.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </Field>
      <div className={s.addRow}>
        <input
          className={s.input}
          placeholder="Language name"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <button className={s.solidBtn} onClick={() => add()}>
          Add
        </button>
      </div>
      {langs.map((l, i) => (
        <div key={l.id} className={s.langItem}>
          <span className={s.langName}>{l.name}</span>
          <span className={s.langLevel}>{l.level}</span>
          <button className={`${s.iconBtn} ${s.danger}`} onClick={() => dispatch({ type: "DEL_ITEM", sec: "languages", idx: i })}>
            ✕
          </button>
        </div>
      ))}
      <div className={s.suggests}>
        {COMMON.filter((c) => !langs.find((l) => l.name === c)).map((c) => (
          <button key={c} className={s.suggestBtn} onClick={() => add(c)}>
            + {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function CertsForm() {
  const { state, dispatch } = useApp();
  const items = state.resume.certifications;
  const add = () => dispatch({ type: "ADD_ITEM", sec: "certifications", item: blank("certifications") });
  const u = (i, p) => dispatch({ type: "UPD_ITEM", sec: "certifications", idx: i, payload: p });
  const del = (i) => dispatch({ type: "DEL_ITEM", sec: "certifications", idx: i });

  return (
    <div className={s.formBlock}>
      <h2 className={s.formTitle}>Certifications</h2>
      {items.map((c, i) => (
        <div key={c.id} className={s.itemCard}>
          <div className={s.row2} style={{ alignItems: "flex-start" }}>
            <Field label="Certificate Name">
              <input className={s.input} placeholder="AWS Solutions Architect" value={c.name} onChange={(e) => u(i, { name: e.target.value })} />
            </Field>
            <Field label="Issuing Org">
              <input className={s.input} placeholder="Amazon Web Services" value={c.issuer} onChange={(e) => u(i, { issuer: e.target.value })} />
            </Field>
          </div>
          <div className={s.rowBetween}>
            <Field label="Date">
              <input className={s.input} type="month" value={c.date} onChange={(e) => u(i, { date: e.target.value })} />
            </Field>
            <button className={`${s.iconBtn} ${s.danger}`} onClick={() => del(i)} style={{ marginTop: 24 }}>
              ✕ Remove
            </button>
          </div>
        </div>
      ))}
      <button className={s.addBtn} onClick={add}>
        + Add Certification
      </button>
    </div>
  );
}

function ProjectsForm() {
  const { state, dispatch } = useApp();
  const items = state.resume.projects;
  const add = () => dispatch({ type: "ADD_ITEM", sec: "projects", item: blank("projects") });
  const u = (i, p) => dispatch({ type: "UPD_ITEM", sec: "projects", idx: i, payload: p });
  const del = (i) => dispatch({ type: "DEL_ITEM", sec: "projects", idx: i });

  return (
    <div className={s.formBlock}>
      <h2 className={s.formTitle}>Projects</h2>
      {items.map((proj, i) => (
        <div key={proj.id} className={s.itemCard}>
          <div className={s.rowBetween} style={{ marginBottom: 14 }}>
            <strong className={s.itemTitle}>{proj.name || "New Project"}</strong>
            <button className={`${s.iconBtn} ${s.danger}`} onClick={() => del(i)}>
              ✕
            </button>
          </div>
          <div className={s.row2}>
            <Field label="Project Name">
              <input className={s.input} placeholder="E-Commerce Platform" value={proj.name} onChange={(e) => u(i, { name: e.target.value })} />
            </Field>
            <Field label="Your Role">
              <input className={s.input} placeholder="Lead Developer" value={proj.role} onChange={(e) => u(i, { role: e.target.value })} />
            </Field>
          </div>
          <div className={s.row2}>
            <Field label="Technologies">
              <input
                className={s.input}
                placeholder="React, Node.js, MongoDB"
                value={proj.technologies}
                onChange={(e) => u(i, { technologies: e.target.value })}
              />
            </Field>
            <Field label="URL (optional)">
              <input className={s.input} placeholder="https://github.com/..." value={proj.url} onChange={(e) => u(i, { url: e.target.value })} />
            </Field>
          </div>
          <Field label="Description">
            <textarea
              className={s.textarea}
              rows={3}
              placeholder="What does the project do? What was your impact?"
              value={proj.description}
              onChange={(e) => u(i, { description: e.target.value })}
            />
          </Field>
        </div>
      ))}
      <button className={s.addBtn} onClick={add}>
        + Add Project
      </button>
    </div>
  );
}

// ── SCORE RING ───────────────────────────────────────────────
function ScoreRing({ score }) {
  const r = 22,
    c = 2 * Math.PI * r;
  const color = score < 40 ? "#f43f5e" : score < 70 ? "#f59e0b" : "#22d3a5";
  return (
    <div className={s.scoreRing}>
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={c}
          strokeDashoffset={c - (score / 100) * c}
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <text x="28" y="33" textAnchor="middle" fontSize="12" fontWeight="700" fill={color} fontFamily="Outfit, sans-serif">
          {score}%
        </text>
      </svg>
      <div className={s.scoreLabel}>Score</div>
    </div>
  );
}

// ── MAIN EDITOR ──────────────────────────────────────────────
const SECTIONS = [
  { id: "personal", label: "Personal Info", icon: "👤" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "languages", label: "Languages", icon: "🌐" },
  { id: "certifications", label: "Certifications", icon: "🏆" },
  { id: "projects", label: "Projects", icon: "🚀" },
];

const SECTION_FORMS = {
  personal: PersonalForm,
  experience: ExpForm,
  education: EduForm,
  skills: SkillsForm,
  languages: LangForm,
  certifications: CertsForm,
  projects: ProjectsForm,
};

export default function Editor() {
  const { state, dispatch, completionScore } = useApp();
  const template = getTemplate(state.selectedTemplate);
  const ActiveForm = SECTION_FORMS[state.activeSection];

  return (
    <div className={s.root}>
      <header className={s.header}>
        <button className={s.backBtn} onClick={() => dispatch({ type: "GO", screen: SCREENS.TEMPLATE_PICKER })}>
          ← Templates
        </button>
        <div className={s.headerLogo}>
          <div className={s.logoMark}>RB</div>
          <span>Resume Builder</span>
        </div>
        <div className={s.headerActions}>
          <button className={s.templateBtn} onClick={() => dispatch({ type: "GO", screen: SCREENS.TEMPLATE_PICKER })}>
            🎨 Change Template
          </button>
          <button className={s.finishBtn} onClick={() => dispatch({ type: "GO", screen: SCREENS.PREVIEW })}>
            Preview & Download →
          </button>
        </div>
      </header>

      <div className={s.body}>
        {/* Sidebar nav */}
        <aside className={s.sidebar}>
          <div className={s.scoreArea}>
            <ScoreRing score={completionScore} />
            <div className={s.scoreText}>
              <div className={s.scoreLine}>{completionScore < 40 ? "Keep going!" : completionScore < 70 ? "Looking good!" : "🎉 Great resume!"}</div>
              <div className={s.scoreHint}>Profile strength</div>
            </div>
          </div>

          <nav className={s.nav}>
            {SECTIONS.map((sec) => {
              const hasData = sec.id === "personal" ? !!(state.resume.personal.firstName || state.resume.personal.email) : state.resume[sec.id]?.length > 0;
              return (
                <button
                  key={sec.id}
                  className={`${s.navItem} ${state.activeSection === sec.id ? s.navActive : ""}`}
                  onClick={() => dispatch({ type: "SET_SECTION", id: sec.id })}>
                  <span className={s.navIcon}>{sec.icon}</span>
                  <span className={s.navLabel}>{sec.label}</span>
                  {hasData && <span className={s.navDot} />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Form area */}
        <main className={s.formArea}>
          <div className={s.formScroll}>{ActiveForm && <ActiveForm />}</div>
        </main>

        {/* Live preview */}
        <div className={s.previewArea}>
          <div className={s.previewBar}>
            <div className={s.liveDot} /> Live Preview — {template?.name}
          </div>
          <div className={s.previewScroll}>
            <div className={s.previewPage}>{template && <ResumeEngine template={template} resume={state.resume} accentColor={state.accentColor} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
