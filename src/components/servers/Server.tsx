import { Card } from 'antd'
import styles from './styles.module.css'

interface Props {
  name: string,
  description: string,
  icon: JSX.Element,
  info: string[]
}

export default function Server({
  name,
  description,
  icon,
  info
}: Props) {
  return (
    <div id={name} className={styles['server']}>
      <h2 className={styles['name']}>{name}</h2>
      <p className={styles['description']}>{description}</p>
      {icon}

      <div className={styles['info']}>
        {info.map(i => <p key={i}>{i}</p>)}
      </div>
    </div>
  )
}
