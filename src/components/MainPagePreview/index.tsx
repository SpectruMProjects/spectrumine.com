import styles from './styles.module.css'

export default function MainPagePreview() {
  return (
  <div className={styles['main-page-preview']}>
    <div className={styles['header']}>
      <img src='public/images/logo.png' style={{scale: '70%'}}></img>
      
    </div>

    <div className={styles['info']}>
      Добро пожаловать на платформу лицензионных игровых серверов Minecraft
    </div>

    <div style={{ flex: 1  }}/>
    
    <a href='#servers' className={styles['to-servers']}>
      наши сервера
    </a>

  </div>)
}