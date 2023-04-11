import { create } from 'zustand'
import { activateChangePass } from '@/api'

interface ChangePassState {
  state: 'unknown' | 'process' | 'ok' | 'error'

  activate(code: string): Promise<['ok'] | ['process'] | ['unknown'] | ['error', string]>
}

export const useChangePassState = create<ChangePassState>((set, get) => ({
  state: 'unknown',

  async activate(code) {
    if (get().state == 'process') return ['process']
    set({ state: 'process' })

    const res = await activateChangePass(code)
    switch (res.code) {
      case 'ok':
        set({ state: 'ok' })
        return ['ok']

      case 'CodeExpire':
        set({ state: 'error' })
        return ['error', 'Срок действия кода истёк']

      case 'UserNotFound':
        set({ state: 'error' })
        return ['error', 'Пользователь не найден']

      case 'error':
        set({ state: 'error' })
        return ['error', 'Произошла неизвестная ошибка при изменении пароля']
    
      default:
        set({ state: 'unknown' })
        return ['unknown']
    }
  }
}))