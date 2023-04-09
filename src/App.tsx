import { ConfigProvider, Layout, theme } from 'antd'
import Header from "./components/Header"
import { Route, Routes } from 'react-router'
import Pages from './pages'
import { useAuthPageState } from './store'
import { Suspense, lazy, useEffect } from 'react'
import Footer from '@/components/Footer'
import { startUpdateTokenCycle } from '@/api'

const PagesMain = lazy(() => Pages.Main)
const PagesAuth = lazy(() => Pages.Auth)
const PagesActivateRegisterCode = lazy(() => Pages.ActivateRegisterCode)
const PagesProfile = lazy(() => Pages.Profile)
const PagesHardcoreServer = lazy(() => Pages.HardcoreServer)
const PagesConditionOfUse = lazy(() => Pages.ConditionOfUse)
const PagesNotFound = lazy(() => Pages.NotFound)

function App() {
  const auth = useAuthPageState(s => s.auth)

  useEffect(() => {
    startUpdateTokenCycle().then(() => {
      auth()
    })
  }, [])

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: '100%' }}>
      <Layout.Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <Header />
      </Layout.Header>
      <Layout.Content style={{ display: 'flex' }}>
        <Routes>
          <Route path='/' element={<Suspense><PagesMain /></Suspense>}/>
          <Route path='/auth' element={<PagesAuth />}/>
          <Route path='/auth/activate-register/:code' element={<Suspense><PagesActivateRegisterCode /></Suspense>}/>
          <Route path='/profile' element={<Suspense><PagesProfile /></Suspense>}/>
          <Route path='/servers/hardcore' element={<Suspense><PagesHardcoreServer /></Suspense>}/>
          <Route path='/condition-of-use' element={<Suspense><PagesConditionOfUse /></Suspense>}/>
          <Route path='*' element={<Suspense><PagesNotFound /></Suspense>}/>
        </Routes>
      </Layout.Content>
      <Layout.Footer 
        style={{ 
          backgroundColor: '#001529',
          borderTop: 'white solid 1px'
        }}>
        <Footer />
      </Layout.Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
