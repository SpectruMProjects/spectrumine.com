import Server from './Server'
import styles from './styles.module.css'

const servers = [
  {
    name: 'SpectruMSteam',
    description: 'Сервер с модами. Create и SMP! В разработке...',
    icon: "/images/wrench.png",
    info: ['Без лицензии', 'Моды', 'SMP']
  },
  {
    name: 'Hardcore SMP',
    description:
      'Мечтали поиграть в хардкор с друьзьями? ' +
      'Теперь ваша мечта сбылась! ' +
      'Минимальное количество плагинов, вы платите за свою смерть временем',
    icon: "/images/hcheart.png",
    info: ['1.19.4', 'Лицензия', 'Режим хардкор', 'SMP'],
    url: '/servers/hardcore'
  },
  {
    name: 'Талант телепата',
    description: 'Сервер с заклинаниями. В разработке',
    icon: "/images/wrench.png",
    info: ['Лицензия', 'No SMP']
  }
]

export default function Servers() {
  return (
    <div id="servers" className={styles['block']}>
      {servers.map((server) => (
        <Server
          key={server.name}
          name={server.name}
          description={server.description}
          icon={server.icon}
          info={server.info}
          url={server.url}
        />
      ))}
    </div>
  )
}
