import { HatProduct } from '@/models'
import { create } from 'zustand'

type MethodRes = ['unknown' | 'process' | 'ok'] | ['error', string | undefined]

interface HatProductsState {
  hats?: HatProduct[]

  loadState: 'unknown' | 'process' | 'ok' | 'error'

  load(): Promise<MethodRes>
}

export const useHatProductsState = create<HatProductsState>((set, get) => ({
  loadState: 'unknown',

  async load() {
    if (get().loadState == 'process') return ['process']
    set({ loadState: 'process' })

    await wait(2000)
    const hats = Array(10)
      .fill(0)
      .map(
        (_, i) =>
          new HatProduct(
            i.toString(),
            (i * 1000).toString(),
            `name ${i}`,
            `description description 🤓 description description 🤓 description description description 🤓 ${i}`,
            '/images/bg-main.gif'
          )
      )
    set({ loadState: 'ok', hats })
    return ['ok']
  }
}))

function wait(delay: number) {
  return new Promise((res) => setTimeout(res, delay))
}
