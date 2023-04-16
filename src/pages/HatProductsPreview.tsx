import { Divider } from 'antd'
import { Suspense, lazy } from 'react'

const AsyncHatViewer = lazy(() => import('@/components/HatViewer'))

export default function HatProductsPreview() {
  return (
    <div style={{ backgroundColor: '#001529', width: '100%', color: 'white' }}>
      <Suspense>
        <AsyncHatViewer />
      </Suspense>

      <Divider type="horizontal" />

      <p>price</p>
      <p>name</p>
      <p>description</p>
    </div>
  )
}
