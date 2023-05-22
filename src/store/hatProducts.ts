import { getHardcoreProducts } from '@/api'
import { HatProduct } from '@/models'
import { create } from 'zustand'
import { useUserTheme } from './theme'

type MethodRes = ['unknown' | 'process' | 'ok'] | ['error', string | undefined]

interface HatProductsState {
  hats?: HatProduct[]

  loadState: 'unknown' | 'process' | 'ok' | 'error'

  load(): Promise<MethodRes>

  loadHat(id: string): Promise<HatProduct | null>
}

export const useHatProductsState = create<HatProductsState>((set, get) => ({
  loadState: 'unknown',

  async load() {
    if (get().loadState == 'process') return ['process']
    set({ loadState: 'process' })

    const res = await getHardcoreProducts()
    const locale = useUserTheme.getState().locale.messages

    switch (res.code) {
      case 'ok':
        set({
          loadState: 'ok',
          hats: res.data.map(
            (data) =>
              new HatProduct(
                data.id,
                `${data.price} ₽`,
                data.name,
                data.description,
                data.objUrl,
                data.imgUrl
              )
          )
        })
        return ['ok']

      default:
        set({ loadState: 'error' })
        return ['error', locale.unknownErrorOccurred]
    }
  },

  async loadHat(id) {
    if (get().hats) {
      const hat = get().hats?.find((hat) => hat.id == id)
      if (hat) return hat
    }

    if (get().loadState != 'process') await get().load()
    if (get().hats) {
      const hat = get().hats?.find((hat) => hat.id == id)
      if (hat) return hat
    }

    return null
  }
}))
