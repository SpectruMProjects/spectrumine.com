import { Typography } from 'antd'
import { UserItem as Model } from '../../models'
import styles from './style.module.css'

interface Props {
  item: Model
}

export default function UserItem(props: Props) {
  const item = props.item.item

  return (
    <div className={styles['block']}>
      <div className={styles['container']}>
        <Typography.Text className={styles['count']}>
          {props.item.count}
        </Typography.Text>

        <img src={item.imgUrl} className={styles['icon']} />
        <span />

        <Typography.Text className={styles['name']}>
          {item.name}
        </Typography.Text>
      </div>
    </div>
  )
}
