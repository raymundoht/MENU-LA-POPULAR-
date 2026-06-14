import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MenuDigital from './MenuDigital.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MenuDigital />
  </StrictMode>,
)
