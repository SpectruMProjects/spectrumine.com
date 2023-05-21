import { create } from 'zustand'

interface UserThemeState {
  color: 'light' | 'dark'

  setColor(color: UserThemeState['color']): void
}

function safeColor(color: string | null) {
  if (color != 'light' && color != 'dark') return 'dark'
  return color
}

export const useUserTheme = create<UserThemeState>((set) => ({
  color: safeColor(localStorage.getItem('theme.color')),

  setColor(color) {
    set({ color: safeColor(color) })
    localStorage.setItem('theme.color', safeColor(color))
  }
}))
