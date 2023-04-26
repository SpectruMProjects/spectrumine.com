import { HatProduct } from '@/models'
import styles from './styles.module.css'
import { Skeleton, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import HatViewer from '../HatViewer'

interface Props {
  hat: HatProduct
  onClick?: () => void
}

export default function Hat({ hat, onClick }: Props) {
  const nav = useNavigate()
  //onClick ??= () => nav(`/products/hardcore/${hat.id}`)

  return (
    <div className={styles['hat']}>
      <HatViewer width={150} height={150} url={hat.gLTFUrl} />
      <div className={styles['hat__info']}>
        <Typography.Text className={styles['hat__price']}>
          {hat.price} Руб.
        </Typography.Text>
        <br />
        <Typography.Text className={styles['hat__name']}>
          {hat.name}
        </Typography.Text>
        <br />
        <Typography.Text>{hat.description}</Typography.Text>
      </div>
    </div>
  )
}

export function HatProductSkeleton() {
  return (
    <div className={styles['hat']}>
      <Skeleton.Image
        active={true}
        style={{ width: 150, height: 150 }}
        className={styles['hat__preview']}
      />

      <Skeleton style={{ marginTop: 16 }} active />
    </div>
  )
}
