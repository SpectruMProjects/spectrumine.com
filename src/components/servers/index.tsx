import Server from './Server'
import styles from './styles.module.css'

const servers = [
  { 
    name: 'SpectruMSteam', 
    description: 'Сервер с модами. Create и SMP! В разработке...', 
    icon: <img src='/images/wrench.png' className={styles['icon']} />, 
    info: [
      'Без лицензии',
      'Моды',
      'SMP'
    ]
  },
  {
    name: 'Hardcore SMP',
    description:  'Мечтали поиграть в хардкор с друьзьями? ' + 
                  'Теперь ваша мечта сбылась! ' + 
                  'Минимальное количество плагинов, вы платите за свою смерть временем', 
    icon: <img src='/images/hcheart.png' className={styles['icon']} />, 
    info: [
      '1.19.4',
      'Лицензия',
      'Режим хардкор',
      'SMP'
    ]
  },
  {
    name: 'Талант телепата',
    description:  'Сервер с заклинаниями',
    icon: <img src='/images/wrench.png' className={styles['icon']} />, 
    info: [
      'Лицензия'
    ]
  }
]

export default function Servers() {
  return (
    <div 
      id="servers"
      className={styles['block']}>
      {servers.map(server => 
        <Server 
          name={server.name} 
          description={server.description} 
          icon={server.icon} 
          info={server.info} />
      )}
    </div>
  )
}
