import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

export default function Footer() {
  const nav = useNavigate()
  
  return (
    <div className={styles['block']}>
      <p>
        Организация не имеет никакого отношения к Mojang AB, не нарушает принципы EULA.
        Все права на игру принадлежат Mojang AB. Весь остальной контент принадлежит команде "Спектрум".
      </p>
      <p>
        <a 
          href='/condition-of-use'
          onClick={e => {
            e.preventDefault()
            nav('/condition-of-use')
          }}
        >Условия пользования</a>
      </p>
    </div>
  )
}
