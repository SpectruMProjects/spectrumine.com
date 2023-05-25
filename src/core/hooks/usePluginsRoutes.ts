import { usePlugins } from '@/store/plugins'

export function usePluginsRoutes() {
  const pluginsRoutes: {
    path: string
    element: JSX.Element
  }[] = usePlugins((s) =>
    s.plugins.reduce(
      (acc: any, plugin) => [
        ...acc,
        ...(plugin
          ?.routes?.()
          ?.map((route) => ({ ...route, path: plugin.name + route.path })) ??
          [])
      ],
      []
    )
  )

  return pluginsRoutes
}
