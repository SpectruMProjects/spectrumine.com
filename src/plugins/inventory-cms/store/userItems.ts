import { create } from 'zustand'
import * as api from '../api'

interface UserItemsState {
  items:
    | {
        count: number
        item: {
          id: string
          name: string
          description: string
          imgUrl?: string
          meta?: string
        }
      }[]
    | null

  loadItemsStatus: 'unknown' | 'process' | 'ok' | 'error'

  loadItems(userId: string): Promise<UserItemsState['loadItemsStatus']>
}

export const useUserItems = create<UserItemsState>((set, get) => ({
  items: null,

  loadItemsStatus: 'unknown',

  async loadItems(userId) {
    if (get().loadItemsStatus === 'process') return 'process'
    set({ loadItemsStatus: 'process' })

    const res = await api.getUserItems(userId)

    switch (res.code) {
      case 'ok':
        set({
          loadItemsStatus: 'ok',
          items: res.items.map((i) => ({
            ...i,
            item: {
              ...i.item,
              id: i.item.id.toString()
            }
          }))
        })
        return 'ok'

      default:
        set({ loadItemsStatus: 'error' })
        return 'error'
    }
  }
}))
