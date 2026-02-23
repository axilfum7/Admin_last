import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { TokenContext } from './context/Context.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <TokenContext>
      <App />
  </TokenContext>
</BrowserRouter>
)
