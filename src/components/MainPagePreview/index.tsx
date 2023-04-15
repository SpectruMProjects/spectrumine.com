import styles from './styles.module.css'

export default function MainPagePreview() {
  return (
  <div 
    className={styles['main-page-preview']}
    // style={{ backgroundImage: `url(${bg})` }}
  >
    <div style={{ flex: 1 }}/>

    <div className={styles['header']}>
      <img src='public/images/logo.png' style={{scale: '70%'}}></img>
      
    </div>

    <div style={{ flex: 0 }}/>

    <div className={styles['info']}>
      Добро пожаловать на платформу лицензионных игровых серверов Minecraft
    </div>

    <div style={{ flex: 10  }}/>
    
    <a href='#servers' className={styles['to-servers']}>
      наши сервера
    </a>

  </div>)
}