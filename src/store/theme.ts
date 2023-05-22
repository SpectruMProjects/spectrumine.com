import { create } from 'zustand'
import locales, { Locale } from '@/locales'

function safeColor(color: string | null) {
  if (color != 'light' && color != 'dark') return 'dark'
  return color
}

function safeLang(lang: string | null): (typeof locales)['locales'][number] {
  if (!locales.locales.includes(lang as any)) return 'ru'
  return lang as any
}

interface UserThemeState {
  color: 'light' | 'dark'
  lang: (typeof locales)['locales'][number]
  locale: Locale

  langLoadState: 'ok' | 'process'

  setColor(color: UserThemeState['color']): void
  setLang(lang: UserThemeState['lang']): Promise<void>

  preloadLang(): Promise<void>
}

export const useUserTheme = create<UserThemeState>((set, get) => ({
  color: safeColor(localStorage.getItem('theme.color')),
  lang: safeLang(localStorage.getItem('theme.lang')) ?? navigator.language,
  locale: locales.ru,

  langLoadState: 'ok',

  setColor(color) {
    set({ color: safeColor(color) })
    localStorage.setItem('theme.color', safeColor(color))
  },

  async setLang(lang) {
    set({ langLoadState: 'process' })

    localStorage.setItem('theme.lang', safeLang(lang))

    set({
      langLoadState: 'ok',
      lang: safeLang(lang),
      locale: await locales[safeLang(lang)]
    })
  },

  async preloadLang() {
    set({ langLoadState: 'process' })
    set({
      langLoadState: 'process',
      locale: await locales[safeLang(get().lang)]
    })
  }
}))
