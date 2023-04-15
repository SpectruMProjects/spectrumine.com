import { HatProduct } from '@/models'

interface Props {
  hat: HatProduct
}

export default function Hat({ hat }: Props) {
  return (
    <div>
      {JSON.stringify(hat)}
    </div>
  )
}
