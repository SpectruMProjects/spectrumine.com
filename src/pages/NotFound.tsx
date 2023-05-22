import { Typography } from 'antd'
import styles from './styles.module.css'
import { useSetPageTitle } from '@/hooks'
import { useUserTheme } from '@/store/theme'

export default function NotFound() {
  const locale = useUserTheme(s => s.locale.notFound)
  useSetPageTitle(locale.pageTitle)

  return (
    <div
      style={{ padding: '2em', textAlign: 'center' }}
      className={styles['centered-page']}
    >
      <Typography.Title>
        {locale.text(window.location.pathname)}
      </Typography.Title>
    </div>
  )
}
