import { HatProduct } from '@/models'
import Products from '../Products'
import styles from './styles.module.css'

interface Props {
  hats: HatProduct[]
}

export default function Hat({ hats }: Props) {
  return (
    <div className={styles['hats']}>
      {hats.map(hat => 
        <Products.Hat
          hat={hat} 
          key={hat.id}/>)}
    </div>
  )
}
