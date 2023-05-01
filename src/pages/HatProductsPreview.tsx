import {
  Suspense,
  lazy,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import styles from './hatProductPreview.module.css'
import { useParams } from 'react-router-dom'
import { useHatProductsState } from '@/store/hatProducts'
import { HatProduct } from '@/models'
import { Button, Divider, Empty, Spin } from 'antd'

const AsyncHatViewer = lazy(() => import('@/components/HatViewer'))

export default function HatProductsPreview() {
  const ref = useRef(true) //isAlive
  const { id } = useParams()
  const [hat, setHat] = useState<HatProduct | null>(null)
  const [load] = useHatProductsState((s) => [s.loadHat])
  const [isLoad, setIsLoad] = useState(false)

  useLayoutEffect(() => {
    ref.current = true
    return () => {
      ref.current = false
    }
  }, [id])

  useEffect(() => {
    setIsLoad(true)
    load(id ?? '').then((newHat) => {
      if (!ref.current) return
      setHat(newHat)

      setIsLoad(false)
    })
  }, [id])

  if (isLoad) return <Spin />
  if (!hat)
    return (
      <div className={styles['centered-page']}>
        <Empty />
      </div>
    )

  return <HatProductsPreviewComponent hat={hat} />
}

interface ComponentProps {
  hat: HatProduct
}

export function HatProductsPreviewComponent({ hat }: ComponentProps) {
  return (
    <div className={styles['centered-page']}>
      <div className={styles['block']}>
        <Suspense>
          <div className={styles['hat-container']}>
            <AsyncHatViewer className={styles['view']} url={hat.gLTFUrl} />
          </div>
        </Suspense>

        <div className={styles['text']}>
          <span className={styles['name']}>{hat.name}</span>
          <span className={styles['price']}>{hat.price}</span>
          <span className={styles['description']}>{hat.description}</span>
          <div className={styles['divider']} />
          <Button type="primary" size="large" shape="round">
            Купить
          </Button>
        </div>
      </div>
    </div>
  )
}
