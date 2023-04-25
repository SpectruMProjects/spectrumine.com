import { getInventory } from '@/api'
import { HatItem } from '@/models'
import { create } from 'zustand'

interface InventoryState {
  hats: HatItem[] | null

  loadingState: 'unknown' | 'process' | 'ok' | 'error'

  load(): Promise<['unknown' | 'process' | 'ok'] | ['error', string]>
}
export const useInventoryState = create<InventoryState>((set, get) => ({
  hats: null,

  loadingState: 'unknown',

  async load() {
    if (get().loadingState == 'process') return ['process']
    set({ loadingState: 'process' })

    const res = await getInventory()
    switch (res.code) {
      case 'ok':
        set({
          loadingState: 'ok',
          hats: res.data.map(
            (json) =>
              new HatItem(
                json.id,
                json.name,
                json.description,
                json.imgUrl,
                json.objUrl,
                String(json.price)
              )
          )
        })
        return ['ok']

      default:
        set({ loadingState: 'error' })
        return ['error', 'Произошла неизвестная ошибка']
    }
  }
}))
