# 🚀 Resume Builder Pro

A powerful, high-aesthetic, open-source resume builder built with **React 18** and **Vite**. Features a unique JSON-driven template engine, guided onboarding, and real-time live preview.

![Resume Builder Demo](https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200)

## ✨ Key Features

- **🏠 Premium Landing Page**: Modern, high-conversion design with smooth scroll animations.
- **🧭 Step-by-Step Onboarding**: Smart experience-based flow that recommends templates based on your career level, photo preference, and industry.
- **🎭 25+ Stunning Templates**: Curated library of professional designs (Executive, Creative, Tech, Minimal, and more).
- **🎨 Infinite Customization**: Change accent colors instantly and watch the entire resume update in real-time.
- **⚡ JSON-Driven Engine**: Templates are defined as pure JSON objects. Adding a new design requires zero additional React components.
- **📄 Pro Preview & Export**: Centered live preview with high-fidelity scaling and clean HTML/PDF export options.
- **🌙 Light/Dark Theming**: Modern UI that respects professional design standards.

## 🏗️ Architecture

The project is designed for scalability and performance:

```text
src/
├── engine/          # Core ResumeEngine.jsx - The single renderer for ALL templates
├── templates/       # templateDefs.js - The 25+ JSON definitions for all designs
├── store/           # AppContext.jsx - Global state management (useReducer)
├── pages/           # High-level screen components (HomePage, Editor, etc.)
└── styles/          # Global tokens and design system (CSS Modules)
```

### The JSON Template Engine

The core innovation is our **pure JSON template system**. A template is simply a config object:

```javascript
{
  id: 'lumina',
  layout: 'sidebar-left',
  fonts: { heading: 'Inter', body: 'Outfit' },
  style: {
    sectionHeadStyle: 'uppercase-bar',
    expStyle: 'minimal',
  },
  sections: {
    sidebar: ['contact', 'skills'],
    main: ['summary', 'experience', 'education']
  }
}
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/resume-builder-pro.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Styling**: Vanilla CSS + CSS Modules (Zero external UI libraries for maximum performance)
- **Typography**: [Google Fonts](https://fonts.google.com/) (Inter, Outfit, DM Mono)
- **Icons**: SVG-based system for zero bloat

## 🤝 Contributing

We welcome contributions!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ♥ for job seekers everywhere.
