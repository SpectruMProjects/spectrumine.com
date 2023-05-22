import { ItemType } from 'antd/es/menu/hooks/useItems'

export interface Plugin {
  name: string

  onStart?(): void

  menuOptions?(): ItemType[]

  routes?(): { path: string; element: JSX.Element }[]
}
