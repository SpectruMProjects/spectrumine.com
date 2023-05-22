import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { useCallback } from 'react'
import { Layout } from 'antd'
import { useUserTheme } from '@/store/theme'

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
  const locale = useUserTheme(s => s.locale.footer)
  
  return (
    <Layout.Footer>
      <div className={styles['block']}>
        <p>
          {locale.text}
          <a
            href="/condition-of-use"
            onClick={(e) => {
              e.preventDefault()
              onClickConditionOfUse()
            }}
          >
            {' '+locale.conditionOfUse+' '}
          </a>
          <a
            href="/contacts"
            onClick={(e) => {
              e.preventDefault()
              onClickContacts()
            }}
          >
            {locale.contacts}
          </a> 
          <Link to="/rules"> {locale.rules}</Link>
        </p>
      </div>
    </Layout.Footer>
  )
}
