import { HatProduct } from '@/models'
import styles from './styles.module.css'
import { Skeleton, Typography } from 'antd'

interface Props {
  hat: HatProduct
}

export default function Hat({ hat }: Props) {
  return (
    <div className={styles['hat']}>
      {hat.previewUrl 
        ? <img 
            loading='lazy'
            className={styles['hat__preview']}
            src={hat.previewUrl} 
            alt={`${hat.name} preview`}/>
        : <Skeleton.Image
            style={{ width: 150, height: 150 }}
            className={styles['hat__preview']}/>}
      
      <div className={styles['hat__info']}>
        <Typography.Text className={styles['hat__price']}>
          {hat.price}
        </Typography.Text>
        <br />
        <Typography.Text className={styles['hat__name']}>
          {hat.name}
        </Typography.Text>
        <br />
        <Typography.Text>
          {hat.descriptions}
        </Typography.Text>
      </div>
    </div>
  )
}