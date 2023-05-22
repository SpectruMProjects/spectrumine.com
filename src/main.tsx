import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Preloader from './components/Preloader'
// import { inventoryCmsPlugin } from './plugins'
// import { usePlugins } from './store/plugins'

// const pluginsState = usePlugins.getState()
// pluginsState.addPlugin(inventoryCmsPlugin)

const App = lazy(() => import('./App'))

window.onload = () => {
  document.querySelector('.body_1111')?.remove()
  if (import.meta.env.DEV) {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <Suspense fallback={<Preloader />}>
            <App />
          </Suspense>
        </BrowserRouter>
      </React.StrictMode>
    )
  } else {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <BrowserRouter>
        <Suspense fallback={<Preloader />}>
          <App />
        </Suspense>
      </BrowserRouter>
    )
  }
}
