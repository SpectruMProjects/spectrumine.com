import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

interface Props {
  name: string
  description: string
  icon: string
  info: string[]
  url?: string
}

export default function Server({ name, description, icon, info, url }: Props) {
  const nav = useNavigate()

  function onClick() {
    if (url) nav(url)
  }

  return (
    <div
      id={name}
      className={styles['server']}
      onClick={onClick} 
      style={{ backgroundImage: `url(${icon})` }}>
      <div className={styles['container']}>
        <h2 className={styles['name']}>{name}</h2>
        <p className={styles['description']}>{description}</p>
        <img src={icon} className={styles['icon']} />

        <div className={styles['info']}>
          {info.map((i) => (
            <p key={i}>{i}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
