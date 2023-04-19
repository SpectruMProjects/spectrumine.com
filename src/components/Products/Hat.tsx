import { HatProduct } from '@/models'
import styles from './styles.module.css'
import { Skeleton, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'

interface Props {
  hat: HatProduct
  onClick?: () => void
}

const AsyncHatViewer = lazy(() => import('@/components/HatViewer'))

export default function Hat({ hat, onClick }: Props) {
  const nav = useNavigate()
  onClick ??= () => nav(`/products/hardcore/${hat.id}`)

  return (
    <div onClick={onClick} className={styles['hat']}>
      {hat.previewUrl ? (
        <img
          loading="lazy"
          className={styles['hat__preview']}
          src={hat.previewUrl}
          alt={`${hat.name} preview`}
        />
      ) : (
        <Suspense>
          <AsyncHatViewer url={hat.gLTFUrl} />
        </Suspense>
      )}

      <div className={styles['hat__info']}>
        <Typography.Text className={styles['hat__price']}>
          {hat.price}
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
