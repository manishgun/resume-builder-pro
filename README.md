# Resume Builder Pro v2.0

A professional, full-featured resume builder with a stunning landing page, guided onboarding, and a powerful **JSON-driven template engine**.

## Quick Start

```bash
npm install
npm run dev
```

## Architecture

### JSON Template Engine

The core innovation: **templates are pure JSON data**, and a single `ResumeEngine` component renders any template. To add a new template, just add an object to `src/templates/templateDefs.js` — no new component code needed.

```
src/
├── templates/templateDefs.js    ← Template JSON definitions (8 templates)
├── engine/ResumeEngine.jsx      ← Single renderer for all templates
├── store/AppContext.jsx          ← Global state (useReducer)
├── pages/
│   ├── HomePage.jsx             ← Landing page
│   ├── Onboard.jsx              ← 5-step onboarding flow
│   ├── TemplatePicker.jsx       ← Template selection with live preview
│   ├── Editor.jsx               ← Resume editor with live preview
│   └── Preview.jsx              ← Final preview + download
```

### Flow

1. **Landing Page** → Beautiful marketing page with CTA
2. **Experience** → How many years of experience?
3. **Photo** → With or without photo?
4. **Columns** → 1 or 2 column layout?
5. **Style** → Simple, Modern, Bold, or Contemporary?
6. **Industry** → 12 industry options
7. **Template Picker** → Filtered templates with live preview + accent color
8. **Editor** → 7 sections, live preview, score ring
9. **Preview** → Full preview, template switcher, download

### Adding New Templates

Add to `src/templates/templateDefs.js`:

```js
{
  id: 'mytemplate',
  name: 'My Template',
  tags: ['1-column', 'without-photo', 'software'],
  layout: 'single',          // 'single' | 'sidebar-left' | 'sidebar-right'
  fonts: { heading: 'Inter', body: 'Outfit' },
  palette: {
    headerBg: '#ffffff',
    headerText: '#111111',
    mainBg: '#ffffff',
    mainText: '#333333',
    mainMuted: '#666666',
    accent: '{accent}',      // '{accent}' = replaced with user's chosen color
    headingBorder: '{accent}',
  },
  sections: {
    header: ['nameBlock', 'contact'],
    main: ['summary', 'experience', 'education', 'skills'],
  },
  style: {
    sectionHeadStyle: 'simple-line',  // 8 heading styles available
    expStyle: 'flat',                  // 6 experience styles available
    skillStyle: 'chips',               // 7 skill styles available
    photoStyle: 'circle',              // circle | circle-border | square-rounded | none
    nameSize: 28,
  },
}
```

## Templates

| Template | Layout              | Best For              |
| -------- | ------------------- | --------------------- |
| Atlas    | 2-col left sidebar  | Corporate, Tech       |
| Nova     | 1-col dark header   | Software, Creative    |
| Meridian | 1-col serif         | Executive, Finance    |
| Prism    | 2-col right sidebar | Creative, Design      |
| Horizon  | 1-col minimal       | ATS, Healthcare       |
| Vertex   | 2-col dark          | Developers, Tech      |
| Bloom    | 1-col soft          | Education, Healthcare |
| Slate    | 2-col editorial     | Media, Marketing      |

## Tech Stack

- React 18 + Vite 5
- CSS Modules
- React Context + useReducer
- Google Fonts: Inter + Outfit + DM Mono
- Zero external dependencies
