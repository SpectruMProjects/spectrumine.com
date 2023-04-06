import { ConfigProvider, Layout, theme } from 'antd'
import Header from "./components/Header"
import { Route, Routes } from 'react-router'
import Pages from './pages'
import { useAuthPageState } from './store'
import { useEffect } from 'react'
import Footer from '@/components/Footer'

function App() {
  const auth = useAuthPageState(s => s.auth)

  useEffect(() => {
    auth()
  }, [])

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: '100%' }}>
      <Layout.Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <Header />
      </Layout.Header>
      <Layout.Content style={{ display: 'flex' }}>
        <Routes>
          <Route path='/' element={<Pages.Main />}/>
          <Route path='/auth' element={<Pages.Auth />}/>
          <Route path='/auth/activate-register/:code' element={<Pages.ActivateRegisterCode />}/>
          <Route path='/profile' element={<Pages.Profile />}/>
          <Route path='/servers/hardcore' element={<Pages.HardcoreServer />}/>
          <Route path='/condition-of-use' element={<Pages.ConditionOfUse />}/>
          <Route path='*' element={<Pages.NotFound />}/>
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
