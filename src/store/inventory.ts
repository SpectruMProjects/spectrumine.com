import { getInventory } from '@/api'
import { HatProduct } from '@/models'
import { create } from 'zustand'

interface InventoryState {
  hats: HatProduct[] | null

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
    console.log(res)

    return ['ok']
  }
}))
