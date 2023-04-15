import { HatProduct } from '@/models'
import Products from '../Products'
import styles from './styles.module.css'
import { HatProductSkeleton } from '@/components/Products/Hat'
import { Empty } from 'antd'

interface Props {
  hats: HatProduct[]
}

export default function Hat({ hats }: Props) {
  if (hats.length == 0)
    return (
      <Empty />
    )
  
  return (
    <div className={styles['hats']}>
      {hats.map(hat => 
        <Products.Hat
          hat={hat} 
          key={hat.id}/>)}
    </div>
  )
}

interface SkeletonProps {
  count?: number
}

export function HatListSkeleton({ count = 10 }: SkeletonProps) {
  return <div className={styles['hats']}>
    {Array(count).fill(0).map(_ => 
      <HatProductSkeleton key={_}/>)}
  </div>
}