import { create } from 'zustand'
import * as api from '../api'
import { UserItem } from '../models'

interface UserItemsState {
  items: UserItem[] | null

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
          items: res.items.map(
            (i) =>
              new UserItem(
                userId,
                { ...i.item, id: i.item.id.toString() },
                i.count
              )
          )
        })
        return 'ok'

      default:
        set({ loadItemsStatus: 'error' })
        return 'error'
    }
  }
}))
