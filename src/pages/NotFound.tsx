import { Typography } from 'antd'
import styles from './styles.module.css'
import { useSetPageTitle } from '@/hooks'

export default function NotFound() {
  useSetPageTitle('SpectruM - 404')

  return (
    <div
      style={{ padding: '2em', textAlign: 'center' }}
      className={styles['centered-page']}
    >
      <Typography.Title>
        Страница {window.location.pathname} не найдена
      </Typography.Title>
    </div>
  )
}
