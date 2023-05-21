import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { useAuthPageState } from '@/store'
import Link from 'antd/es/typography/Link'
import { usePluginsMenuOptions } from '@/core'
import styles from './styles.module.css'
function onLinkClick(e: { preventDefault: () => void }) {
  e.preventDefault()
}

export default function Header() {
  const path = useLocation().pathname
  const nav = useNavigate()
  const [user, authStatus] = useAuthPageState((s) => [s.user, s.authStatus])
  const pluginsOptions = usePluginsMenuOptions()

  return (
    <Menu
      style={{ backgroundColor: 'transparent' }}
      theme="dark"
      mode="horizontal"
      selectedKeys={[path]}
      className={styles['menu']}
      onSelect={(i) => nav(i.key)}
      items={[
        {
          key: '/',
          label: (
            <Link onClick={onLinkClick} href="/">
              Главная
            </Link>
          ),
          icon: <HomeOutlined />
        },
        { type: 'divider', style: { flex: 1, margin: 0, border: 0 } },
        ...(['process', 'unknown'].includes(authStatus)
          ? []
          : user
          ? [
              {
                key: '/profile',
                label: (
                  <Link onClick={onLinkClick} href="/profile">
                    Профиль
                  </Link>
                ),
                icon: <UserOutlined />
              }
            ]
          : [
              {
                key: '/auth',
                label: (
                  <Link onClick={onLinkClick} href="/auth">
                    Войти
                  </Link>
                ),
                icon: <UserOutlined />
              }
            ]),
        ...pluginsOptions
        // {
        //   key: '/store',
        //   label: (
        //     <Link onClick={onLinkClick} href="/auth">
        //       Магазин
        //     </Link>
        //   ),
        //   icon: <ShopOutlined />
        // }
      ]}
    />
  )
}
