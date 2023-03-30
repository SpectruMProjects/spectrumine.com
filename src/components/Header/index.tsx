import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router";
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { useAuthPageState } from "../../store";

export default function Header() {
  const path = useLocation().pathname
  const nav = useNavigate()
  const user = useAuthPageState(s => s.user)

  return (
    <Menu 
      theme="dark" 
      mode="horizontal"
      selectedKeys={[path]}
      onSelect={i => nav(i.key)}
      items={[
        { key: '/', label: 'Главная', icon: <HomeOutlined /> },           
        { type: 'divider', style: { flex: 1 } },
        user 
          ? { key: '/profile', label: 'Профиль', icon: <UserOutlined /> }
          : { key: '/auth', label: 'Регистрация', icon: <UserOutlined /> },           
      ]}/>
  )
}
