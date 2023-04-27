import { HatProduct } from '@/models'
import Products from '../Products'
import styles from './styles.module.css'
import { HatProductSkeleton } from '@/components/Products/Hat'
import { Empty } from 'antd'

interface Props {
  hats: HatProduct[]
  showPrice?: boolean
}

export default function Hat({ hats, showPrice = true }: Props) {
  if (hats.length == 0) return <Empty />

  return (
    <div className={styles['hats']}>
      {hats.map((hat) => (
        <Products.Hat hat={hat} key={hat.id} showPrice={showPrice} />
      ))}
    </div>
  )
}

interface SkeletonProps {
  count?: number
}

export function HatListSkeleton({ count = 10 }: SkeletonProps) {
  return (
    <div className={styles['hats']}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <HatProductSkeleton key={i} />
        ))}
    </div>
  )
}
