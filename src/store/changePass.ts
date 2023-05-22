import { create } from 'zustand'
import { activateChangePass } from '@/api'
import * as api from '@/api'
import { useUserTheme } from './theme'

interface ChangePassState {
  state: 'unknown' | 'process' | 'ok' | 'error'

  activate(
    code: string,
    logoutAnywhere?: boolean
  ): Promise<['ok'] | ['process'] | ['unknown'] | ['error', string]>
}

export const useChangePassState = create<ChangePassState>((set, get) => ({
  state: 'unknown',

  async activate(code, logoutAnywhere = false) {
    if (get().state == 'process') return ['process']
    set({ state: 'process' })

    if (logoutAnywhere) await api.logoutAnywhere()

    const res = await activateChangePass(code)
    const locale = useUserTheme.getState().locale.messages

    switch (res.code) {
      case 'ok':
        set({ state: 'ok' })
        return ['ok']

      case 'CodeExpire':
        set({ state: 'error' })
        return ['error', locale.codeExpired]

      case 'UserNotFound':
        set({ state: 'error' })
        return ['error', locale.userNotFound]

      case 'error':
        set({ state: 'error' })
        return ['error', locale.unknownErrorOccurred]

      default:
        set({ state: 'unknown' })
        return ['unknown']
    }
  }
}))
