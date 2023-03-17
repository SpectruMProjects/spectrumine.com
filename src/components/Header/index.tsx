import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router";
import { HomeOutlined, UserOutlined } from '@ant-design/icons'

export default function Header() {
  const path = useLocation().pathname
  const nav = useNavigate()

  return (
    <Menu 
      theme="dark" 
      mode="horizontal"
      selectedKeys={[path]}
      onSelect={i => nav(i.key)}
      items={[
        { key: '/', label: 'Главная', icon: <HomeOutlined /> },           
        { type: 'divider', style: { flex: 1 } },
        { key: '/auth', label: 'Войти', icon: <UserOutlined /> },           
      ]}/>
  )
}
