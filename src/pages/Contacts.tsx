import { List, Typography } from 'antd'
import styles from './styles.module.css'
import { useSetPageTitle } from '@/hooks'
import { MailOutlined } from '@ant-design/icons'

const messengers = [
  {
    name: 'Telegram - ',
    link: ' Наша группа',
    linkSrc: 't.me/spectrumine',
    icon: <img
      src='/icons/telegram.svg' 
      alt='telegram logo' />
  },
  {
    name: 'Discord - ',
    link: 'Наш канал',
    linkSrc: 'https://discord.gg/w2Ks8HFPDJ',
    icon: <img
      src='/icons/discord.svg' 
      alt='discord logo' />  
  }
]

const emails = [
  {
    email: 'spectruminesup@gmail.com ',
    description: ' - Поддержка'
  }
]

export default function Contacts() {
  useSetPageTitle('SpectruM - Контакты')

  return (
    <div className={styles['contacts-page']}>
      <List
        className={styles['contacts-page__messengers']}
        header={
          <p className={styles['contacts-page__messengers__title']}>
            Мессенджеры
          </p>}
        dataSource={messengers}
        renderItem={(messenger => 
          <div
            key={messenger.name}
            className={styles['contacts-page__messengers__contact']}
          >
            <Typography.Text>{messenger.icon}</Typography.Text>
            <Typography.Text
              className={styles['contacts-page__messengers__contact__text']}>
                {messenger.name}
            </Typography.Text>
            <Typography.Link 
              className={styles['contacts-page__messengers__contact__text']}
              href={messenger.linkSrc}>
              {messenger.link}
            </Typography.Link>
          </div>)}/>

      <List
        className={styles['contacts-page__emails']}
        header={
          <p className={styles['contacts-page__emails__title']}>
            <MailOutlined /> Почта
          </p>}
        dataSource={emails}
        renderItem={(messenger => 
          <div
            key={messenger.email}
            className={styles['contacts-page__emails__contact']}>
            <Typography.Text>{messenger.email}</Typography.Text>
            <Typography.Text>{messenger.description}</Typography.Text>
          </div>)}/>
    </div>
  )
}
