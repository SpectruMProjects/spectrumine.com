import { useTimer } from '@/hooks'
import styles from './styles.module.css'

export default function MainPagePreview() {
  const time = useTimer(1683997200000)

  return (
    <div className={styles['main-page-preview']}>
      <div className={styles['header']}>
        <img className={styles['logo']} src="/images/logo.png" />
      </div>

      <div className={styles['info']}>
        Добро пожаловать на платформу лицензионных игровых серверов Minecraft
        <br />
        <span style={{ fontSize: '0.7em' }}>
          {time !== '0:0:0:0' && `До запуска Hardcore сервера осталось ${time}`}
        </span>
      </div>

      <div style={{ flex: 1 }} />

      <a href="#servers" className={styles['to-servers']}>
        наши сервера
      </a>
    </div>
  )
}
