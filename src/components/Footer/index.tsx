import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { useCallback } from 'react'
import { Layout } from 'antd'

export default function Footer() {
  const nav = useNavigate()
  const onClickConditionOfUse = useCallback(
    () => nav('/condition-of-use'),
    [nav]
  )
  const onClickContacts = useCallback(() => nav('/contacts'), [nav])

  return (
    <FooterComponent
      onClickConditionOfUse={onClickConditionOfUse}
      onClickContacts={onClickContacts}
    />
  )
}

interface ComponentProps {
  onClickConditionOfUse: () => void
  onClickContacts: () => void
}
export function FooterComponent({
  onClickConditionOfUse,
  onClickContacts
}: ComponentProps) {
  return (
    <Layout.Footer
      style={{
        backgroundColor: '#1f1f1f',
        // borderTop: 'white solid 1px'
      }}
    >
      <div className={styles['block']}>
        <p>
          Организация не имеет никакого отношения к Mojang AB, не нарушает
          принципы EULA. Все права на игру принадлежат Mojang AB. Весь остальной
          контент принадлежит команде {'"Спектрум"'}.
          <a
            href="/condition-of-use"
            onClick={(e) => {
              e.preventDefault()
              onClickConditionOfUse()
            }}
          >
            {' '}
            Условия пользования.{' '}
          </a>
          <a
            href="/contacts"
            onClick={(e) => {
              e.preventDefault()
              onClickContacts()
            }}
          >
            Наши контакты
          </a> 
          <Link to="/rules"> Правила</Link>
        </p>
      </div>
    </Layout.Footer>
  )
}
