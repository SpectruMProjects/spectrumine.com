import { Avatar, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import { useAuthPageState } from '@/store'
import Link from 'antd/es/typography/Link'
// import { usePluginsMenuOptions } from '@/core'
import styles from './styles.module.css'
import './global.css'
import { colors, useUserTheme } from '@/store/theme'
import locales from '@/locales'
import { colorsMap } from '@/App'
function onLinkClick(e: { preventDefault: () => void }) {
  e.preventDefault()
}

export default function Header() {
  const path = useLocation().pathname
  const nav = useNavigate()
  const [user, authStatus] = useAuthPageState((s) => [s.user, s.authStatus])
  // const pluginsOptions = usePluginsMenuOptions()
  const [setLang, setColorTheme] = useUserTheme(s => [s.setLang, s.setColor])

  return (
    <Menu
      style={{ backgroundColor: 'transparent' }}
      theme="dark"
      mode="horizontal"
      selectedKeys={[path]}
      className={styles['menu']}
      onSelect={(i) => i.key.startsWith('@') || nav(i.key)}
      overflowedIndicator={
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 64 
        }}>
          <img width='28' height='28' src='/icons/list.svg' alt='more'/>
        </div>
      }
      items={[
        {
          key: '/',
          label: (
            <Link onClick={onLinkClick} href="/">
              Главная
            </Link>
          ),
          icon: <img width='28' height='28' src='/icons/home.svg' alt='home'/>
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
                icon: <img width='28' height='28' src='/icons/user-profile.svg' alt='profile'/>
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
                icon: <img width='28' height='28' src='/icons/user-profile.svg' alt='profile'/>
              }
            ]),
        { 
          key: '@locale',
          label: 'Язык', 
          children: locales.locales.map(key => ({
            key: `@locale-${key}`,
            label: locales.localesNames[key],
            onClick() {
              setLang(key)
            }
          }))
        },
        {
          key: '@color',
          label: 'Тема',
          children: colors.map(color => ({
            key: `@color-${color}`,
            label: color,
            icon: <span style={{ 
              width: 28, 
              height: 28, 
              borderRadius: 8,
              backgroundColor: colorsMap[color] 
            }}/>,
            onClick(){ setColorTheme(color) }
          }))
        },
        // ...pluginsOptions
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
