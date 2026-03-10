import React, { useState } from 'react'
import { useApp, SCREENS } from '../store/AppContext'
import s from './Onboard.module.css'

// ── Shared layout ────────────────────────────────────────────
function OnboardShell({ step, total, title, sub, children, onBack }) {
  return (
    <div className={s.root}>
      <div className={s.bgGlow} />
      <div className={s.inner}>
        {/* Progress */}
        <div className={s.progress}>
          <button className={s.backBtn} onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </button>
          <div className={s.dots}>
            {Array.from({ length: total }, (_, i) => (
              <div key={i} className={`${s.dot} ${i < step ? s.dotDone : i === step - 1 ? s.dotActive : ''}`} />
            ))}
          </div>
          <span className={s.stepCounter}>{step}/{total}</span>
        </div>

        <div className={s.card}>
          <div className={s.cardInner}>
            <div className={s.heading}>
              <h1 className={s.title}>{title}</h1>
              {sub && <p className={s.sub}>{sub}</p>}
            </div>
            {children}
          </div>

          {/* Right side preview hint */}
          <div className={s.cardPreview}>
            <div className={s.previewHint}>
              <div className={s.previewIcon}>📄</div>
              <p className={s.previewText}>Your resume is being personalized based on your answers</p>
              <div className={s.previewStats}>
                <div className={s.pStat}><span>50%</span> Higher interview rate</div>
                <div className={s.pStat}><span>3×</span> More callbacks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── EXPERIENCE SCREEN ────────────────────────────────────────
const EXP_OPTIONS = [
  { id: 'fresher', label: 'Fresher', sub: 'No professional experience yet', icon: '🌱' },
  { id: '1-2', label: '1–2 Years', sub: 'Early career professional', icon: '🚀' },
  { id: '2-4', label: '2–4 Years', sub: 'Growing your career', icon: '📈' },
  { id: '4-6', label: '4–6 Years', sub: 'Mid-level professional', icon: '💼' },
  { id: '6-10', label: '6–10 Years', sub: 'Senior professional', icon: '⭐' },
  { id: '10+', label: '10+ Years', sub: 'Executive / Expert level', icon: '🏆' },
]

export function ExperienceScreen() {
  const { state, dispatch } = useApp()
  const selected = state.prefs.experience

  const pick = (id) => {
    dispatch({ type: 'SET_PREF', key: 'experience', value: id })
    setTimeout(() => dispatch({ type: 'GO', screen: SCREENS.ONBOARD_PHOTO }), 300)
  }

  return (
    <OnboardShell step={1} total={5} title="How much work experience do you have?" sub="We'll recommend the best resume format and templates for your level." onBack={() => dispatch({ type: 'GO', screen: SCREENS.HOME })}>
      <div className={s.optGrid}>
        {EXP_OPTIONS.map(opt => (
          <button
            key={opt.id}
            className={`${s.optCard} ${selected === opt.id ? s.optSelected : ''}`}
            onClick={() => pick(opt.id)}
          >
            <span className={s.optIcon}>{opt.icon}</span>
            <div>
              <div className={s.optLabel}>{opt.label}</div>
              <div className={s.optSub}>{opt.sub}</div>
            </div>
            <div className={s.optCheck} />
          </button>
        ))}
      </div>
    </OnboardShell>
  )
}

// ── PHOTO SCREEN ────────────────────────────────────────────
export function PhotoScreen() {
  const { state, dispatch } = useApp()
  const selected = state.prefs.withPhoto

  const pick = (val) => {
    dispatch({ type: 'SET_PREF', key: 'withPhoto', value: val })
    setTimeout(() => dispatch({ type: 'GO', screen: SCREENS.ONBOARD_COLUMNS }), 300)
  }

  return (
    <OnboardShell step={2} total={5} title="Do you want to include a photo?" sub="Some industries prefer photos, others don't. Tip: tech and finance roles typically skip photos." onBack={() => dispatch({ type: 'GO', screen: SCREENS.ONBOARD_EXPERIENCE })}>
      <div className={s.bigOptRow}>
        <button className={`${s.bigOpt} ${selected === true ? s.optSelected : ''}`} onClick={() => pick(true)}>
          <div className={s.bigOptIcon}>
            <div className={s.photoMock}>
              <div className={s.photoCircle}>👤</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, padding: '8px 10px' }}>
                <div className={s.mockLine2} style={{ width: '70%' }} />
                <div className={s.mockLine2} style={{ width: '50%', opacity: 0.5 }} />
              </div>
            </div>
          </div>
          <div className={s.bigOptLabel}>With Photo</div>
          <div className={s.bigOptSub}>Recommended for creative, sales, and teaching roles</div>
          <div className={s.optCheck2} />
        </button>

        <button className={`${s.bigOpt} ${selected === false ? s.optSelected : ''}`} onClick={() => pick(false)}>
          <div className={s.bigOptIcon}>
            <div className={s.photoMock}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 14px' }}>
                <div className={s.mockLine2} style={{ width: '60%' }} />
                <div className={s.mockLine2} style={{ width: '40%', opacity: 0.5 }} />
                <div className={s.mockLine2} style={{ width: '70%', marginTop: 6 }} />
                <div className={s.mockLine2} style={{ width: '55%', opacity: 0.5 }} />
              </div>
            </div>
          </div>
          <div className={s.bigOptLabel}>Without Photo</div>
          <div className={s.bigOptSub}>Best for tech, finance, legal and ATS-heavy applications</div>
          <div className={s.optCheck2} />
        </button>
      </div>
    </OnboardShell>
  )
}

// ── COLUMNS SCREEN ──────────────────────────────────────────
export function ColumnsScreen() {
  const { state, dispatch } = useApp()
  const selected = state.prefs.columns

  const pick = (val) => {
    dispatch({ type: 'SET_PREF', key: 'columns', value: val })
    setTimeout(() => dispatch({ type: 'GO', screen: SCREENS.ONBOARD_STYLE }), 300)
  }

  return (
    <OnboardShell step={3} total={5} title="Single or two-column layout?" sub="Two-column fits more content. Single-column is cleaner and ATS-friendly." onBack={() => dispatch({ type: 'GO', screen: SCREENS.ONBOARD_PHOTO })}>
      <div className={s.bigOptRow}>
        <button className={`${s.bigOpt} ${selected === 1 ? s.optSelected : ''}`} onClick={() => pick(1)}>
          <div className={s.bigOptIcon}>
            <div className={s.colMock1}>
              {[0,1,2,3,4].map(i => <div key={i} className={s.colLine} style={{ width: `${65 + Math.sin(i) * 20}%` }} />)}
            </div>
          </div>
          <div className={s.bigOptLabel}>1 Column</div>
          <div className={s.bigOptSub}>Clean, simple, ATS-optimized. Great for traditional industries.</div>
          <div className={s.optCheck2} />
        </button>

        <button className={`${s.bigOpt} ${selected === 2 ? s.optSelected : ''}`} onClick={() => pick(2)}>
          <div className={s.bigOptIcon}>
            <div className={s.colMock2}>
              <div className={s.colSide}>
                {[0,1,2].map(i => <div key={i} className={s.colLineSide} />)}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, padding: '10px 10px' }}>
                {[0,1,2,3,4].map(i => <div key={i} className={s.colLine} style={{ width: `${60 + Math.sin(i) * 25}%` }} />)}
              </div>
            </div>
          </div>
          <div className={s.bigOptLabel}>2 Columns</div>
          <div className={s.bigOptSub}>More content, modern look. Perfect for tech and creative fields.</div>
          <div className={s.optCheck2} />
        </button>
      </div>
    </OnboardShell>
  )
}

// ── STYLE SCREEN ────────────────────────────────────────────
const STYLES = [
  { id: 'simple', icon: '◻', label: 'Simple', sub: 'Clean, minimal, professional. Lets your content shine.' },
  { id: 'modern', icon: '◈', label: 'Modern', sub: 'Contemporary design with bold typography and accents.' },
  { id: 'bold', icon: '◆', label: 'Bold', sub: 'Strong visual impact. Stand out from the crowd.' },
  { id: 'contemporary', icon: '⬡', label: 'Contemporary', sub: 'Balanced design that works across all industries.' },
]

export function StyleScreen() {
  const { state, dispatch } = useApp()
  const selected = state.prefs.style

  const pick = (id) => {
    dispatch({ type: 'SET_PREF', key: 'style', value: id })
    setTimeout(() => dispatch({ type: 'GO', screen: SCREENS.ONBOARD_INDUSTRY }), 300)
  }

  return (
    <OnboardShell step={4} total={5} title="What's your design preference?" sub="Choose the style that best matches your personality and industry." onBack={() => dispatch({ type: 'GO', screen: SCREENS.ONBOARD_COLUMNS })}>
      <div className={s.styleGrid}>
        {STYLES.map(st => (
          <button key={st.id} className={`${s.styleCard} ${selected === st.id ? s.optSelected : ''}`} onClick={() => pick(st.id)}>
            <div className={s.styleIcon}>{st.icon}</div>
            <div className={s.optLabel}>{st.label}</div>
            <div className={s.optSub}>{st.sub}</div>
          </button>
        ))}
      </div>
    </OnboardShell>
  )
}

// ── INDUSTRY SCREEN ──────────────────────────────────────────
const INDUSTRIES = [
  { id: 'software', icon: '💻', label: 'Software / Tech' },
  { id: 'designer', icon: '🎨', label: 'Design / Creative' },
  { id: 'management', icon: '👔', label: 'Management / Executive' },
  { id: 'marketing', icon: '📣', label: 'Marketing / Sales' },
  { id: 'finance', icon: '💹', label: 'Finance / Banking' },
  { id: 'healthcare', icon: '🏥', label: 'Healthcare / Medical' },
  { id: 'teacher', icon: '📚', label: 'Education / Teaching' },
  { id: 'engineering', icon: '⚙️', label: 'Engineering' },
  { id: 'legal', icon: '⚖️', label: 'Legal / Law' },
  { id: 'media', icon: '📺', label: 'Media / Journalism' },
  { id: 'nonprofit', icon: '🤝', label: 'Non-Profit / NGO' },
  { id: 'other', icon: '🌐', label: 'Other' },
]

export function IndustryScreen() {
  const { state, dispatch } = useApp()
  const selected = state.prefs.industry

  const pick = (id) => {
    dispatch({ type: 'SET_PREF', key: 'industry', value: id })
    setTimeout(() => dispatch({ type: 'GO', screen: SCREENS.TEMPLATE_PICKER }), 300)
  }

  return (
    <OnboardShell step={5} total={5} title="What's your industry?" sub="We'll match templates that are commonly used and trusted in your field." onBack={() => dispatch({ type: 'GO', screen: SCREENS.ONBOARD_STYLE })}>
      <div className={s.industryGrid}>
        {INDUSTRIES.map(ind => (
          <button key={ind.id} className={`${s.industryCard} ${selected === ind.id ? s.optSelected : ''}`} onClick={() => pick(ind.id)}>
            <span className={s.indIcon}>{ind.icon}</span>
            <span className={s.indLabel}>{ind.label}</span>
          </button>
        ))}
      </div>
    </OnboardShell>
  )
}
