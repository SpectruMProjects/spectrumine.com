import { List, Typography } from 'antd'
import styles from './styles.module.css'
import { useSetPageTitle } from '@/hooks'
import { MailOutlined } from '@ant-design/icons'
import { useUserTheme } from '@/store/theme'

export default function Contacts() {
  useSetPageTitle('SpectruM - Контакты')
  const locale = useUserTheme(s => s.locale.contacts)

  return (
    <div className={styles['contacts-page']}>
      <List
        className={styles['contacts-page__messengers']}
        header={
          <p className={styles['contacts-page__messengers__title']}>
            {locale.messengersTitle}
          </p>
        }
        dataSource={locale.messengers}
        renderItem={(messenger) => (
          <div
            key={messenger.name}
            className={styles['contacts-page__messengers__contact']}
          >
            <img src={messenger.iconSrc}/>
            <Typography.Text
              className={styles['contacts-page__messengers__contact__text']}
            >
              {messenger.name}
            </Typography.Text>
            <Typography.Link
              className={styles['contacts-page__messengers__contact__text']}
              href={messenger.linkSrc}
            >
              {messenger.link}
            </Typography.Link>
          </div>
        )}
      />

      <List
        className={styles['contacts-page__emails']}
        header={
          <p className={styles['contacts-page__emails__title']}>
            <MailOutlined /> Почта
          </p>
        }
        dataSource={locale.emails}
        renderItem={(messenger) => (
          <div
            key={messenger.email}
            className={styles['contacts-page__emails__contact']}
          >
            <Typography.Text>{messenger.email}</Typography.Text>
            <Typography.Text>{messenger.description}</Typography.Text>
          </div>
        )}
      />
    </div>
  )
}
