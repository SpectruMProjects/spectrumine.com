import { ConfigProvider, Layout } from 'antd'
import Header from './components/Header'
import { Route, Routes } from 'react-router'
import Pages from './pages'
import { useAuthPageState } from './store'
import { Suspense, useEffect } from 'react'
import Footer from '@/components/Footer'
import { startUpdateTokenCycle } from '@/api'
import ru from 'antd/locale/ru_RU'

function App() {
  const auth = useAuthPageState((s) => s.auth)

  useEffect(() => {
    startUpdateTokenCycle().then(() => {
      auth()
    })
  }, [])

  return (
    <ConfigProvider
      locale={ru}
      theme={
        {
          // token: {
          //   colorPrimary: '#5A4545'
          // }
        }
      }
    >
      <Layout style={{ minHeight: '100%' }}>
        <Layout.Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%'
          }}
        >
          <Header />
        </Layout.Header>
        <Layout.Content style={{ display: 'flex' }}>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense>
                  <Pages.Main />
                </Suspense>
              }
            />
            <Route
              path="/auth"
              element={
                <Suspense>
                  <Pages.Auth />
                </Suspense>
              }
            />
            <Route
              path="/auth/activate-register/:code"
              element={
                <Suspense>
                  <Pages.ActivateRegisterCode />
                </Suspense>
              }
            />
            <Route
              path="/auth/activate-change-pass/:code"
              element={
                <Suspense>
                  <Pages.ActivateChangePassCode />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense>
                  <Pages.Profile />
                </Suspense>
              }
            />
            <Route
              path="/servers/hardcore"
              element={
                <Suspense>
                  <Pages.HardcoreServer />
                </Suspense>
              }
            />
            <Route
              path="/condition-of-use"
              element={
                <Suspense>
                  <Pages.ConditionOfUse />
                </Suspense>
              }
            />
            <Route
              path="/hardcore/statistics/:username"
              element={
                <Suspense>
                  <Pages.UserHardcoreStatistics />
                </Suspense>
              }
            />
            <Route
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
            />
            <Route
              path="/contacts"
              element={
                <Suspense>
                  <Pages.Contacts />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense>
                  <Pages.NotFound />
                </Suspense>
              }
            />
          </Routes>
        </Layout.Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  )
}

export default App
