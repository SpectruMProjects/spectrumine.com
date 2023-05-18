import styles from './styles.module.css'

function onServersClick() {
  document.getElementById('servers')?.scrollIntoView()
}

export default function MainPagePreview() {
  return (
    <div className={styles['block']}>
      <img src='images/logo.png' alt='logo' className={styles['logo']} />
      
      <span className={styles['greeting']}>
        Платформа лицензионных серверов Minecraft
      </span>
      
      <button onClick={onServersClick} className={styles['to-servers']}>
        <a href='#server'>К серверам</a>
      </button>
    </div>
  )
}
