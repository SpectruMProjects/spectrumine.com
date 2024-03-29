import { Locale } from './locale'
import ru from './ru'
import en from './en'

export * from './locale'

export default {
  locales: ['ru', 'en'] as const,
  localesNames: {
    ru: 'Русский',
    en: 'English'
  },

  ru,

  get en(): Promise<Locale> {
      return import('./en').then((e) => e.default)
  }

  // get be() {
  //   return import('./be')
  // }
}
