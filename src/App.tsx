import { ConfigProvider, Layout, theme } from 'antd'
import Header from './components/Header'
import { Route, Routes } from 'react-router'
import Pages from './pages'
import { useAuthPageState } from './store'
import { Suspense, useEffect } from 'react'
import Footer from '@/components/Footer'
import { startUpdateTokenCycle } from '@/api'
import { colorsMap, useUserTheme } from './store/theme'
import { usePluginLoader } from './plugins'
import { usePluginsRoutes } from './core'
import Preloader from './components/Preloader'

function App() {
  const auth = useAuthPageState((s) => s.auth)
  const [loadLang, color] = useUserTheme((s) => [s.preloadLang, s.color])
  const pluginsRoutes = usePluginsRoutes()
  usePluginLoader()

  useEffect(() => {
    startUpdateTokenCycle().then(() => {
      auth()
    })
    loadLang()
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: colorsMap[color],
          // colorBgBase: '141414',
          borderRadius: 0
        }
      }}
    >
      <Suspense fallback={<Preloader />}>
        <Layout style={{ minHeight: '100%' }}>
          <Layout.Header
            style={{
              position: 'fixed',
              top: 0,
              zIndex: 1,
              width: '100%',
              backgroundColor: 'transparent',
              backdropFilter: 'blur(16px)'
            }}
          >
            <Header />
          </Layout.Header>
          <Layout.Content style={{ display: 'flex' }}>
            <Routes>
              <Route path="/" element={<Pages.Main />} />
              <Route path="/auth" element={<Pages.Auth />} />
              <Route
                path="/auth/activate-register/:code"
                element={<Pages.ActivateRegisterCode />}
              />
              <Route
                path="/auth/activate-change-pass/:code"
                element={<Pages.ActivateChangePassCode />}
              />
              <Route path="/profile" element={<Pages.Profile />} />
              <Route
                path="/servers/hardcore"
                element={<Pages.HardcoreServer />}
              />
              <Route
                path="/condition-of-use"
                element={<Pages.ConditionOfUse />}
              />
              <Route
                path="/hardcore/statistics/:username"
                element={<Pages.UserHardcoreStatistics />}
              />
              {/* <Route
              path="/store"
              element={
                <Suspense>
                  <Pages.Store />
                </Suspense>
              }
            />
            <Route
              path="/products/hardcore/:id"
              element={
                <Suspense>
                  <Pages.HatProductsPreview />
                </Suspense>
              }
            /> */}
              <Route path="/contacts" element={<Pages.Contacts />} />
              <Route path="/rules" element={<Pages.Rules />} />
              {pluginsRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
              <Route path="*" element={<Pages.NotFound />} />
            </Routes>
          </Layout.Content>
          <Footer />
        </Layout>
      </Suspense>
    </ConfigProvider>
  )
}

export default App
