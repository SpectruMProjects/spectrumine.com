import styles from './styles.module.css'
import bg from '@/assets/images/bg-main.gif'

export default function MainPagePreview() {
  return (
  <div 
    className={styles['main-page-preview']}
    // style={{ backgroundImage: `url(${bg})` }}
  >
    <div style={{ flex: 1 }}/>

    <div className={styles['header']}>
      {window.location.hostname}
    </div>

    <div style={{ flex: 2 }}/>

    <div className={styles['info']}>
      Добро пожаловать на платформу лицензионных игровых серверов Minecraft
    </div>

    <div style={{ flex: 5 }}/>
    
    <a href='#servers' className={styles['to-servers']}>
      сервера
    </a>

  </div>)
}