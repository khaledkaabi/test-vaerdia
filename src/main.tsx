import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const App = React.lazy(() => import("./App"));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <React.Suspense fallback={<p>Chargement de l'application...</p>}>
      <App />
    </React.Suspense>
  </StrictMode>,
)
