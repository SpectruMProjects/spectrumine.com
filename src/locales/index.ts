import { Locale } from './locale'
import ru from './ru'

export * from './locale'

export default {
  locales: ['ru'] as const,
  localesNames: {
    ru: 'Русский'
    // en: 'English'
  },

  ru

  // get en(): Promise<Locale> {
  //   return import('./en').then((e) => e.default)
  // }

  // get be() {
  //   return import('./be')
  // }
}
