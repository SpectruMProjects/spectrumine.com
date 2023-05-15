import { Plugin } from '@/core'
import { Suspense } from 'react'
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
        element: (
          <Suspense>
            <Pages.Main />
          </Suspense>
        )
      }
    ]
  }
}
