import { usePlugins } from '@/store/plugins'
import { ItemType } from 'antd/es/menu/hooks/useItems'

export function usePluginsMenuOptions() {
  return usePlugins((state) =>
    state.plugins.reduce(
      (acc: ItemType[], cur) => [
        ...acc,
        ...(cur?.menuOptions?.() ?? []).map((item) => ({
          ...item,
          key: cur.name + item?.key
        }))
      ],
      []
    )
  )
}
