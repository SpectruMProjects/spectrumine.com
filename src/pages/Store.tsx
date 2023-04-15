import ProductsList from '@/components/ProductsList'
import { HatListSkeleton } from '@/components/ProductsList/Hat'
import { useHatProductsState } from '@/store/hatProducts'
import { Typography } from 'antd'
import { useEffect } from 'react'

export default function Store() {
  const [hatsState, hats, load] = useHatProductsState(s => [s.loadState, s.hats, s.load])

  useEffect(() => {
    load()
  }, [])

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div style={{ padding: 16 }}>
        <Typography.Title style={{ textAlign: 'center' }}>Шапки</Typography.Title>
        {hatsState == 'process' 
          ? <HatListSkeleton/> 
          : <ProductsList.Hat hats={hats ?? []}/>}
      </div>
    </div>
  )
}
