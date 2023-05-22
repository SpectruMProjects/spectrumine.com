import { Plugin } from '@/core'
import Pages from './pages'
import { DropboxOutlined } from '@ant-design/icons'

export const inventoryCmsPlugin: Plugin = {
  name: 'inventory-cms',
  menuOptions() {
    return [{ key: '/', label: 'Инвентарь', icon: <DropboxOutlined /> }]
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
