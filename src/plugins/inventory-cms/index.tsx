import { Plugin } from '@/core'
import Pages from './pages'
import { useUserTheme } from '@/store/theme'

export const inventoryCmsPlugin: Plugin = {
  name: 'inventory-cms',
  menuOptions() {
    const locale = useUserTheme((s) => s.locale.inventoryCms.inventory)

    return [
      {
        key: '/',
        label: locale,
        icon: (
          <img
            width="28"
            height="28"
            src="/icons/backpack.svg"
            alt="inventory"
          />
        )
      }
    ]
  },
  routes() {
    return [
      {
        path: '/',
        element: <Pages.Main />
      }
    ]
  }
}
