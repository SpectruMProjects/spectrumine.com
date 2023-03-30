import { create } from "zustand"
import { User } from "../models"
import * as api from '../api'

interface Register {
  username: string
  email: string
  password: string
}

interface Login {
  username: string
  password: string
}

interface AuthPageState {
  user: User | null

  type: 'register' | 'login'

  registerStatus: 'unknown' | 'process' | 'ok' | 'error'
  loginStatus: 'unknown' | 'process' | 'ok' | 'error'
  activateRegisterCodeStatus: 'unknown' | 'process' | 'ok' | 'error'

  switchType(): void
  register(data: Register): Promise<'process' | 'ok' | 'error'>
  login(data: Login): Promise<'process' | 'ok' | 'error'>
  activateRegisterCode(code: string): Promise<'process' | 'ok' | 'error'>
  auth(): Promise<'process' | 'ok' | 'error'>
}

export const useAuthPageState = create<AuthPageState>((set, get) => ({
  user: null,
  
  type: 'register',
  registerStatus: 'unknown',
  loginStatus: 'unknown',
  activateRegisterCodeStatus: 'unknown',

  switchType() {
    set({ type: get().type == 'login' ? 'register' : 'login' })},

  async register(data) {
    if (get().registerStatus == 'process') return 'process'
    set({ registerStatus: 'process' })

    const res = await api.register(data)
    switch(res.code) {
      case 'ok': {
        set({ registerStatus: 'ok' })
        return 'ok'
      }
      case 'error': {
        set({ registerStatus: 'error' })
        return 'error'
      }
      default: {
        set({ registerStatus: 'unknown' })
        return 'error'
      }
    }
  },

  async login(data) {
    if (get().loginStatus == 'process') return 'process'
    set({ loginStatus: 'process' })

    const res = await api.login(data)
    switch(res.code) {
      case 'ok': {
        set({ registerStatus: 'ok', 
              user: new User(
                '', 
                api.localUser.get()?.username!, 
                '')})
        return 'ok'
      }
      case 'error': {
        set({ registerStatus: 'error' })
        return 'error'
      }
      default: {
        set({ registerStatus: 'unknown' })
        return 'error'
      }
    }
  },

  async activateRegisterCode(code) {
    if (get().activateRegisterCodeStatus === 'process') return 'process'
    set({ activateRegisterCodeStatus: 'process' })

    const res = await api.activateRegister({code})
    switch (res.code) {
      case 'ok':
        const lu = api.localUser.get()
        set({ 
          activateRegisterCodeStatus: 'ok',
          user: new User(
            '',
            lu?.username ?? 'Ник',
            lu?.email ?? 'Почта'
          ) 
        })
        return 'ok'
      case 'error':
        set({ activateRegisterCodeStatus: 'error' })
        return 'error'
      default:
        set({ activateRegisterCodeStatus: 'unknown' })
        return 'error'
    }
  },

  async auth() {
    const res = await api.auth()
    switch (res.code) {
      case 'ok':
        const lu = api.localUser.get()
        set({ user: new User(
          '',
         lu?.username ?? 'Ник',
         lu?.email ?? 'email'
        ) })   
        return 'ok'
      default:
        return 'error'
    }
  }
}))