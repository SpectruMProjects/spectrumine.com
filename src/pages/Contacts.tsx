import { List, Typography } from 'antd'
import styles from './styles.module.css'
import { SendOutlined } from '@ant-design/icons'

const messengers = [
  {
    name: 'Telegram',
    link: 'Lisoveily',
    linkSrc: 'https://t.me/Lisoveily',
    icon: <img
      src='/icons/telegram.svg' 
      alt='telegram logo' />
  },
  {
    name: 'Discord',
    link: 'Lisoveily',
    linkSrc: 'https://t.me/Lisoveily',
    icon: <img
      src='/icons/discord.svg' 
      alt='discord logo' />  
  }
]

export default function Contacts() {
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
      
    </div>
  )
}
