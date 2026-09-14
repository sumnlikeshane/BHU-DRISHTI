import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import {
  MAP_PERFORMANCE_MARKS,
  markMapPerformance,
} from './features/landing/map/performance'
import './index.css'

markMapPerformance(MAP_PERFORMANCE_MARKS.appStart)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
