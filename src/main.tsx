import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeContextProvider } from './ThemeContext'
import SurveyStepper from './components/SurveyStepper/SurveyStepper'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <SurveyStepper />
    </ThemeContextProvider>
  </StrictMode>,
)
