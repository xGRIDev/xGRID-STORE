//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import  {ThemeProvider}  from './components/styles/themes.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ThemeProvider>
        <App />
  </ThemeProvider>
  </BrowserRouter>,
)
