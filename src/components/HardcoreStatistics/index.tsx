import { HardcoreStatistics as Model} from "@/models/HardcoreStatistics"
import styles from './styles.module.css'
import { Card } from "antd"
import { useEffect, useState } from "react"

interface Props {
  statistics: Model
}

function formatDeaths(count: number) {
  if ([11,12,13,14,15,17,18,19].includes(count)) return 'смертей'

  const last = count % 10
  if ([1].includes(last)) return 'смерть'
  
  return 'смерти'
}

const formatter = Intl.DateTimeFormat('ru', { 
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
})

function formatDate(date: Date) {
  return formatter.format(date)
}

function formatTimeToRespawn(time: number) {
  const now = Date.now()
  let delta = Math.abs(time - now) / 1000
  
  const days = Math.floor(delta / 86400)
  delta -= days * 86400

  let hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  var minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60

  const seconds = Math.floor(delta % 60)
  
  return `${days}:${hours}:${minutes}:${seconds}`
}

export default function HardcoreStatistics({ statistics }: Props) {
  return (
    <Card style={{ width: 'fit-content' }}>
      <div className={styles['block']}>
        <p className={styles['title']}>
          Статистика сервера hardcore
        </p>

        <div className={styles['content']}>
          <div className={styles['deaths']}>
            <img src="/images/hcheart.png" alt="heart" className={styles['heart']}/>
            <p>{statistics.deaths.length} {formatDeaths(statistics.deaths.length)}</p>
          </div>

          <div className={styles['inner']}>
            <Respwan rT={statistics.lastDeath?.timeToRespawn ?? 0}/>

          <div style={{ flex: 1, minHeight: 28 }}/>

          {statistics.lastDeath != undefined &&
          <div className={styles['info']}>
            <p>Дата последней смерти {formatDate(new Date(statistics.lastDeath.time))}</p>
            <p>{statistics.lastDeath.issuer 
              ? `Был убит "${statistics.lastDeath.issuer}" при помощи "${statistics.lastDeath.issue}"` 
              : `Умер из-за "${statistics.lastDeath.issue}"`}
            </p>
          </div>}
          </div>
        </div>
      </div>
    </Card>
  )
}

function Respwan({rT}: {rT: number}) {
  const [timeToRespawn, setTimeToRespawn] = useState('0:0:0:0')

  useEffect(() => {
    setTimeToRespawn(formatTimeToRespawn(rT))
    const id = setInterval(() => {
      setTimeToRespawn(formatTimeToRespawn(rT))
    }, 1000)
    return () => clearInterval(id)
  }, [rT])

  if (timeToRespawn == '0:0:0:0') 
    return <div className={styles['respawn']} style={{ color: '#73d13d' }}>
      Вы можете играть
    </div>

  return <div className={styles['respawn']}>
      Возрождение через <p style={{ fontSize: '1.2em', color: '#f5222d' }}>
      {timeToRespawn}
    </p>
  </div>
}