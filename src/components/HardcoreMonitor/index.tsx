import { useHardcoreMonitor } from '@/hooks'
import Progress from 'antd/lib/progress'
import styles from './styles.module.css'
import { Typography } from 'antd'

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
  const heartClasses = Array(10)
    .fill(0)
    .map((_, i) => styles[getClassForHeart(i)])

  return (
    <div className={styles['block']}>
      <div className={styles['online']}>
        <Typography.Text>0</Typography.Text>
        <Typography.Text>{stats.max}</Typography.Text>
      </div>

      <div className={styles['hearts']}>
        {heartsArray.map((i) => (
          <span className={heartClasses[i]} key={i}>
            {stats.current != 0 && stats.current != stats.max && i == latI ? (
              <div key={i}>{stats.current}</div>
            ) : (
              <div key={i} />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
