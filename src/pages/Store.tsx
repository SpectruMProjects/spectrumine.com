import ProductsList from '@/components/ProductsList'
import { HatProduct } from '@/models'
import { Typography } from 'antd'

const data = Array(10).fill(0).map((_, i) => new HatProduct(
  i.toString(),
  (i*1000).toString(),
  `name ${i}`,
  `description description description description description description description ${i}`
))

export default function Store() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div style={{ padding: 16 }}>
        <Typography.Title style={{ textAlign: 'center' }}>Шапки</Typography.Title>
        <ProductsList.Hat hats={data} />
      </div>
    </div>
  )
}
