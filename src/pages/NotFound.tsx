import { Typography } from 'antd'
import styles from './styles.module.css'

export default function NotFound() {
  return (
    <div
      style={{ padding: '2em' }} 
      className={styles['centered-page']}>
      <Typography.Title>
        Страница {window.location.pathname} не найдена
      </Typography.Title>
    </div>
  )
}
