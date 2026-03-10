import React, { createContext, useContext, useReducer } from "react";

export const SCREENS = {
  HOME: "home",
  ONBOARD_EXPERIENCE: "onboard_experience",
  ONBOARD_PHOTO: "onboard_photo",
  ONBOARD_COLUMNS: "onboard_columns",
  ONBOARD_STYLE: "onboard_style",
  ONBOARD_INDUSTRY: "onboard_industry",
  TEMPLATE_PICKER: "template_picker",
  EDITOR: "editor",
  PREVIEW: "preview",
};

const defaultResume = {
  personal: {
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    pinCode: "",
    website: "",
    linkedin: "",
    summary: "",
    photo: null,
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
};

const init = {
  screen: SCREENS.HOME,
  prefs: { experience: null, withPhoto: null, columns: null, style: null, industry: null },
  selectedTemplate: null,
  accentColor: "#6c63ff",
  resume: defaultResume,
  activeSection: "personal",
};

function score(r) {
  let s = 0;
  const p = r.personal;
  if (p.firstName) s += 5;
  if (p.lastName) s += 5;
  if (p.title) s += 5;
  if (p.email) s += 8;
  if (p.phone) s += 5;
  if (p.city) s += 4;
  if (p.summary?.length > 30) s += 13;
  if (r.experience.length) s += 20;
  if (r.education.length) s += 15;
  if (r.skills.length >= 3) s += 10;
  if (r.languages.length) s += 5;
  if (r.certifications.length) s += 5;
  return Math.min(100, s);
}

function reducer(state, action) {
  switch (action.type) {
    case "GO":
      return { ...state, screen: action.screen };
    case "SET_PREF":
      return { ...state, prefs: { ...state.prefs, [action.key]: action.value } };
    case "SET_TEMPLATE":
      return { ...state, selectedTemplate: action.payload };
    case "SET_ACCENT":
      return { ...state, accentColor: action.color };
    case "SET_SECTION":
      return { ...state, activeSection: action.id };
    case "UPD_PERSONAL": {
      const resume = { ...state.resume, personal: { ...state.resume.personal, ...action.payload } };
      return { ...state, resume };
    }
    case "ADD_ITEM": {
      const resume = { ...state.resume, [action.sec]: [...state.resume[action.sec], action.item] };
      return { ...state, resume };
    }
    case "UPD_ITEM": {
      const resume = { ...state.resume, [action.sec]: state.resume[action.sec].map((x, i) => (i === action.idx ? { ...x, ...action.payload } : x)) };
      return { ...state, resume };
    }
    case "DEL_ITEM": {
      const resume = { ...state.resume, [action.sec]: state.resume[action.sec].filter((_, i) => i !== action.idx) };
      return { ...state, resume };
    }
    default:
      return state;
  }
}

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, init);
  const completionScore = score(state.resume);
  return <Ctx.Provider value={{ state, dispatch, completionScore }}>{children}</Ctx.Provider>;
}
