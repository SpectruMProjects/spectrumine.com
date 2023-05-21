import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import { useAuthPageState } from '@/store'
import Link from 'antd/es/typography/Link'
import { usePluginsMenuOptions } from '@/core'
import styles from './styles.module.css'
import './global.css'
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
          icon: <img width='32' height='32' src='/icons/home.svg' alt='home'/>
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
                icon: <img width='32' height='32' src='/icons/user-profile.svg' alt='profile'/>
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
                icon: <img width='32' height='32' src='/icons/user-profile.svg' alt='profile'/>
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
