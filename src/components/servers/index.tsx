import { useUserTheme } from '@/store/theme'
import Server from './Server'
import styles from './styles.module.css'

export default function Servers() {
  const servers = useUserTheme(s => Object.values(s.locale.servers))
  
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
