import { Suspense, lazy } from 'react'
import styles from './hatProductPreview.module.css'

const AsyncHatViewer = lazy(() => import('@/components/HatViewer'))

export default function HatProductsPreview() {
  return (
    <div className={styles['block']}>
      <Suspense>
        <AsyncHatViewer />
      </Suspense>

      <div className={styles['text']}>
        <span className={styles['price']}>1000 $</span>
        <br />
        <span className={styles['name']}>name</span>
        <br />
        <span className={styles['description']}>
          {Array(10).fill('description').join(', ')}
        </span>
      </div>
    </div>
  )
}
