import { create } from "zustand"

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
  type: 'register' | 'login'

  registerStatus: 'unknown' | 'process' | 'ok' | 'error'
  loginStatus: 'unknown' | 'process' | 'ok' | 'error'

  switchType(): void
  register(data: Register): Promise<'process' | 'ok' | 'error'>
  login(data: Login): Promise<'process' | 'ok' | 'error'>
}

export const useAuthPageState = create<AuthPageState>((set, get) => ({
  type: 'register',
  registerStatus: 'unknown',
  loginStatus: 'unknown',

  switchType() {
    set({ type: get().type == 'login' ? 'register' : 'login' })
  },

  async register(data) {
    if (get().registerStatus == 'process') return 'process'
    set({ registerStatus: 'process' })

    return 'error'
  },

  async login(data) {
    if (get().loginStatus == 'process') return 'process'
    set({ loginStatus: 'process' })

    return 'error'
  },
}))