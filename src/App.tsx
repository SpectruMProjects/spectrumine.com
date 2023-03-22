import { Layout } from 'antd'
import Header from "./components/Header"
import { Route, Routes } from 'react-router'
import Pages from './pages'

function App() {
  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content style={{ display: 'flex' }}>
        <Routes>
          <Route path='/' element={<Pages.Main />}/>
          <Route path='/auth' element={<Pages.Auth />}/>
          <Route path='*' element={<Pages.NotFound />}/>
        </Routes>
      </Layout.Content>
    </Layout>
  )
}

export default App
