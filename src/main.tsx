import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

window.onload = () => {
  document.querySelector('.body_1111')?.remove()
  if (import.meta.env.DEV) {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    )
  } else {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  }
}
