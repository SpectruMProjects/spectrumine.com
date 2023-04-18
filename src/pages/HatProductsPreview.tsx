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
import { Empty, Spin } from 'antd'

const AsyncHatViewer = lazy(() => import('@/components/HatViewer'))

export default function HatProductsPreview() {
  const { id } = useParams()
  const [isLoad, setIsLoad] = useState(false)
  const [hat, setHat] = useState<HatProduct | null>(null)
  const ref = useRef(true) //isAlive
  const [load] = useHatProductsState((s) => [s.loadHat])

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

  return (
    <div className={styles['block']}>
      <Suspense>
        <AsyncHatViewer url={hat.gLTFUrl} />
      </Suspense>

      <div className={styles['text']}>
        <span className={styles['price']}>{hat.price}</span>
        <br />
        <span className={styles['name']}>{hat.name}</span>
        <br />
        <span className={styles['description']}>{hat.description}</span>
      </div>
    </div>
  )
}
