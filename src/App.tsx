import { Layout } from 'antd'
import Header from "./components/Header"
import { Route, Routes } from 'react-router'
import Pages from './pages'

function App() {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Routes>
          <Route path='/' element={<Pages.Main />}/>
          <Route path='*' element={<Pages.NotFound />}/>
        </Routes>
      </Layout.Content>
    </Layout>
  )
}

export default App
