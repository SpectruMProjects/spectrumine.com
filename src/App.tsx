import { ConfigProvider, Layout, theme } from 'antd'
import Header from "./components/Header"
import { Route, Routes } from 'react-router'
import Pages from './pages'
import { useAuthPageState } from './store'
import { useEffect } from 'react'

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
          <Route path='*' element={<Pages.NotFound />}/>
        </Routes>
      </Layout.Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
