import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeContextProvider } from './ThemeContext'
import SurveyStepper from './components/SurveyLayout/SurveyStepper/SurveyStepper'
import SurveyMain from './components/pages/SurveyMain'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>

      {/* <SurveyStepper /> */}

      <SurveyMain />

    </ThemeContextProvider>
  </StrictMode>,
)
