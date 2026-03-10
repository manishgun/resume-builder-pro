import React from 'react'
import { AppProvider, useApp, SCREENS } from './store/AppContext'
import HomePage from './pages/HomePage'
import { ExperienceScreen, PhotoScreen, ColumnsScreen, StyleScreen, IndustryScreen } from './pages/Onboard'
import TemplatePicker from './pages/TemplatePicker'
import Editor from './pages/Editor'
import Preview from './pages/Preview'

function Router() {
  const { state } = useApp()
  switch (state.screen) {
    case SCREENS.HOME: return <HomePage />
    case SCREENS.ONBOARD_EXPERIENCE: return <ExperienceScreen />
    case SCREENS.ONBOARD_PHOTO: return <PhotoScreen />
    case SCREENS.ONBOARD_COLUMNS: return <ColumnsScreen />
    case SCREENS.ONBOARD_STYLE: return <StyleScreen />
    case SCREENS.ONBOARD_INDUSTRY: return <IndustryScreen />
    case SCREENS.TEMPLATE_PICKER: return <TemplatePicker />
    case SCREENS.EDITOR: return <Editor />
    case SCREENS.PREVIEW: return <Preview />
    default: return <HomePage />
  }
}

export default function App() {
  return <AppProvider><Router /></AppProvider>
}
