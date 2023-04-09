import { ConfigProvider, Layout, theme } from 'antd'
import Header from "./components/Header"
import { Route, Routes } from 'react-router'
import Pages from './pages'
import { useAuthPageState } from './store'
import { Suspense, useEffect } from 'react'
import Footer from '@/components/Footer'
import { startUpdateTokenCycle } from '@/api'

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
          <Route path='/' element={<Suspense><Pages.Main /></Suspense>}/>
          <Route path='/auth' element={<Suspense><Pages.Auth /></Suspense>}/>
          <Route path='/auth/activate-register/:code' element={<Suspense><Pages.ActivateRegisterCode /></Suspense>}/>
          <Route path='/auth/activate-change-pass/:code' element={<Suspense><Pages.ActivateChangePassCode /></Suspense>}/>
          <Route path='/profile' element={<Suspense><Pages.Profile /></Suspense>}/>
          <Route path='/servers/hardcore' element={<Suspense><Pages.HardcoreServer /></Suspense>}/>
          <Route path='/condition-of-use' element={<Suspense><Pages.ConditionOfUse /></Suspense>}/>
          <Route path='*' element={<Suspense><Pages.NotFound /></Suspense>}/>
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
