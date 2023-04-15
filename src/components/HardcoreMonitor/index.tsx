import { useHardcoreMonitor } from "@/hooks";
import Progress from "antd/lib/progress";
import styles from './styles.module.css'

function percent(max: number, current: number) {
  return current / (max / 100)
}
export default function HardcoreMonitor() {
  //here enter IP for stats
  const stats = useHardcoreMonitor(1000, '185.250.36.214:10100')
  
  return <HardcoreMonitorComponent stats={stats}/>
}

interface ComponentProps {
  stats: {
    online: false
  } | {
    online: true,
    max: number,
    current: number
  }
}
export function HardcoreMonitorComponent({
  stats
}: ComponentProps) {
  if(!stats.online)
  return ( 
    <div className={styles['block']}>
      <Progress
        style={{ flex: 1 }}
        strokeColor={{ '0%': '#262626', '100%': '#f5222d' }} 
        status='active'
        percent={percent(1, 1)}
        showInfo={false}/>
      <div className={styles['block__in']}>
        <p>Сервер отключён</p>
      </div>
    </div>)
  
  
  return (
    <div className={styles['block']}>
      <Progress
        style={{ flex: 1 }}
        strokeColor={{ '0%': '#262626', '100%': '#f5222d' }} 
        status='active'
        percent={percent(stats.max, stats.current)}
        showInfo={false}/>
      
      <div className={styles['block__in']}>
        <p>0</p>
        <span style={{ flex: stats.current }}/>
        {(stats.current != 0 && stats.current != stats.max) && <p>{stats.current}</p>}
        <span style={{ flex: stats.max - stats.current }}/>
        <p>{stats.max}</p>
      </div>
    </div>
  )
}