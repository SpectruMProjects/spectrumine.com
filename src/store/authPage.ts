import { create } from "zustand"

interface AuthPageState {
  type: 'register' | 'login'

  switchType(): void
}

export const useAuthPageState = create<AuthPageState>((set, get) => ({
  type: 'register',

  switchType() {
    set({ type: get().type == 'login' ? 'register' : 'login' })
  }
}))