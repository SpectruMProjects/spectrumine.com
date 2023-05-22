import { useUserTheme } from '@/store/theme'
import styles from './styles.module.css'

function onServersClick() {
  document.getElementById('servers')?.scrollIntoView()
}

export default function MainPagePreview() {
  const locale = useUserTheme(s => s.locale.mainPagePreview)

  return (
    <div className={styles['block']}>
      <img src='images/logo.webp' alt='logo' className={styles['logo']} />
      
      <span className={styles['greeting']}>{locale.greeting}</span>
      
      <button onClick={onServersClick} className={styles['to-servers']}>
        <a href='#server'>{locale.toServers}</a>
      </button>
    </div>
  )
}
