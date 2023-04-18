import { useHardcoreMonitor } from '@/hooks'
import Progress from 'antd/lib/progress'
import styles from './styles.module.css'

function percent(max: number, current: number) {
  return current / (max / 100)
}
export default function HardcoreMonitor() {
  //here enter IP for stats
  const stats = useHardcoreMonitor(10000, '185.250.36.214:10100')

  return <HardcoreMonitorComponent stats={stats} />
}

const heartsArray = Array(10)
  .fill(0)
  .map((_, i) => i)

interface ComponentProps {
  stats:
    | {
        online: false
      }
    | {
        online: true
        max: number
        current: number
      }
}
export function HardcoreMonitorComponent({ stats }: ComponentProps) {
  if (!stats.online)
    return (
      <div className={styles['block']}>
        <Progress
          style={{ flex: 1 }}
          strokeColor={{ '0%': '#262626', '100%': '#f5222d' }}
          status="active"
          percent={percent(1, 1)}
          showInfo={false}
        />
        <div className={styles['block__in']}>
          <p>Сервер отключён</p>
        </div>
      </div>
    )

  const per = percent(stats.max, stats.current)
  let latI: number | null = null
  function getClassForHeart(i: number) {
    const oneHeartPercent = 100 / heartsArray.length
    const heartPercent = i * oneHeartPercent
    const less = heartPercent - oneHeartPercent / 4
    const more = heartPercent + oneHeartPercent / 4

    if (less <= per && more <= per) {
      latI = i
      return 'active'
    }
    if (less >= per && more >= per) return 'nonactive'

    latI = i
    return 'active-on-half'
  }

  return (
    <div className={styles['block']}>
      <div />
      <div className={styles['hearts']}>
        {heartsArray.map((i) => (
          <div className={styles[getClassForHeart(i)]} key={i}></div>
        ))}
      </div>
      <div />

      <p>0</p>
      <div className={styles['block__in']}>
        {stats.current != 0 &&
          stats.current != stats.max &&
          heartsArray.map((i) =>
            i == latI ? <span key={i}>{stats.current}</span> : <span key={i} />
          )}
      </div>
      <p>{stats.max}</p>
    </div>
  )
}
