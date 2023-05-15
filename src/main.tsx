import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { inventoryCmsPlugin } from './plugins'
import { usePlugins } from './store/plugins'

const pluginsState = usePlugins.getState()
pluginsState.addPlugin(inventoryCmsPlugin)

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
