import { create } from 'zustand'
import { activateChangePass } from '@/api'

interface ChangePassState {
  state: 'unknown' | 'process' | 'ok' | 'error'

  activate(code: string): Promise<ChangePassState['state']>
}

export const useChangePassState = create<ChangePassState>((set, get) => ({
  state: 'unknown',

  async activate(code) {
    if (get().state == 'process') return 'process'
    set({ state: 'process' })

    const res = await activateChangePass(code)
    switch (res.code) {
      case 'ok':
        set({ state: 'ok' })
        return 'ok'

      case 'error':
        set({ state: 'error' })
        return 'error'
    
      default:
        set({ state: 'unknown' })
        return 'unknown'
    }
  }
}))