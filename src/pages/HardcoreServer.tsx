import { Typography, message } from 'antd'
import styles from './styles.module.css'
import sls from './HardcoreServer.module.css'
import HardcoreMonitor from '@/components/HardcoreMonitor'
import { CopyOutlined } from '@ant-design/icons'
import { useSetPageTitle } from '@/hooks'
import { useLayoutEffect } from 'react'

const hardcoreUrl = '185.250.36.214:10100'

const points = [
  { icon: '/icons/server.svg', title: 'О сервере', description: 'Ванильный геймплей, минимальное количество плагинов. Только хардкор! Платите за свою смерть временем потраченным на сервере.' },
  
  { icon: '/icons/headphones.svg', title: 'Голосовой чат', description: 'На сервере присутствует плагин PlasmoVoice для голосового общения внутри игры. После установки на свой клиент вы сможете беспрепятственно общаться с помощью микрофона.' },
  
  { icon: '/icons/gears.svg', title: 'Как работает?', description: 'Мы сделали плагин, который даёт возможность возродиться спустя время, которое вы провели на сервере, т.к. умереть навсегда было бы слишком сложно.' },

  { icon: '/icons/discord.svg', title: 'Сообщество', description: <>Дружелюбное комьюнити. Discord сервер и другие плюшки. Регистрируйтесь и заходите на сервер!</> },
]

export default function HardcoreServer() {
  useSetPageTitle('SpectruM - Hardcore сервер')
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles['hardcore-page'] + ' ' + sls['page']}>
      <div className={styles['points__dup']}>
        <Typography.Title style={{ display: 'inline' }}>
          <p className={styles['points__title']}>
            Vanilla <span>Hardcore</span> SMP
          </p>
        </Typography.Title>
        <br/>
        <br/>
        <a
          href={hardcoreUrl}
          className={styles['hardcore-page__ip']}
          onClick={(e) => {
            e.preventDefault()
            navigator.clipboard
              .writeText(hardcoreUrl)
              .then(() => {
                message.success(`IP сервера ${hardcoreUrl} скопирован`)
              })
              .catch(() => {
                message.error('Не удалось скопировать ip.\nПопробуйте вручную')
              })
          }}
        >
          IP Адрес <CopyOutlined />
        </a>
      </div>

      <HardcoreMonitor />

      <div className={sls['points']}>
        {points.map(point => <div key={point.title} className={sls['point']}>
          <img className={sls['icon']} src={point.icon} alt={point.title + ' icon'} />
          <span className={sls['title']}>{point.title}</span>
          <span className={sls['description']}>{point.description}</span>
        </div>)}
      </div>
    </div>
  )
}
