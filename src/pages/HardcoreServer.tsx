import { Typography, message } from 'antd'
import styles from './styles.module.css'
import sls from './HardcoreServer.module.css'
import HardcoreMonitor from '@/components/HardcoreMonitor'
import { CopyOutlined } from '@ant-design/icons'
import { useSetPageTitle } from '@/hooks'
import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

const hardcoreUrl = '185.250.36.214:10100'

const points = [
  { icon: '/icons/server.svg', title: 'О сервере', description: 'Ванильный геймплей, минимальное количество плагинов. Только хардкор! Платите за свою смерть временем потраченным на сервере.' },
  
  { icon: '/icons/headphones.svg', title: 'Голосовой сат', description: <>На сервере присутствует плагин <a href='https://plasmovoice.com/'>PlasmoVoice</a> для голосового общения внутри игры.</> },
  
  { icon: '/icons/gears.svg', title: 'Как работает?', description: 'Мы сделали плагин, который даёт возможность возродиться спустя время, которое вы провели на сервере.' },

  { icon: '/icons/discord.svg', title: 'Сообщество', description: <>Дружелюбное комьюнити. <Link to='https://discord.gg/w2Ks8HFPDJ'>Discord</Link> сервер и другие плюшки. Регистрируйтесь и заходите на сервер!</> },
]

export default function HardcoreServer() {
  useSetPageTitle('SpectruM - Hardcore сервер')
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles['hardcore-page']}>
      <div className={styles['points__dup']}>
        <Typography.Title>
          <p className={styles['points__title']}>
            Vanilla <span>Hardcore</span> SMP
          </p>
        </Typography.Title>
      </div>
      <h1 className={styles['hardcore-page__ip']}>
        <a
          style={{ textAlign: 'center' }}
          href={hardcoreUrl}
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
          Скопировать IP <CopyOutlined />
        </a>
      </h1>

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
