import { HatProduct } from '@/models'

interface Props {
  hats: HatProduct[]
}

export default function Hat({ hats }: Props) {
  return (
    <div>
      {JSON.stringify(hats)}
    </div>
  )
}
