import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { useMemo } from 'react'
import { Layout } from 'antd'

export default function Footer() {
  const nav = useNavigate()
  const onClick = useMemo(() => () => nav('/condition-of-use'), [nav])
  
  return <FooterComponent 
    onClickConditionOfUse={onClick}/>
}

interface ComponentProps {
  onClickConditionOfUse: () => void
}
export function FooterComponent({ onClickConditionOfUse }: ComponentProps) {
  return (
    <Layout.Footer 
      style={{ 
        backgroundColor: '#001529',
        borderTop: 'white solid 1px'
      }}>
      <div className={styles['block']}>
        <p>
          Организация не имеет никакого отношения к Mojang AB, не нарушает принципы EULA.
          Все права на игру принадлежат Mojang AB. Весь остальной контент принадлежит команде {"\"Спектрум\""}.
        </p>
        <p>
          <a 
            href='/condition-of-use'
            onClick={e => {
              e.preventDefault()
              onClickConditionOfUse()
            }}
          >Условия пользования</a>
        </p>
      </div>  
    </Layout.Footer>
  )
}