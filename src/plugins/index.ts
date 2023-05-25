import { Plugin } from '@/core'
import { usePlugins } from '@/store/plugins'
import { useLayoutEffect } from 'react'

export function loadPlugin(name: string): Promise<Plugin> | null {
  if (name === 'inventory-cms') {
    return import('./inventory-cms').then((i) => i.inventoryCmsPlugin)
  }

  return null
}

export function usePluginLoader() {
  const loadPlugins = usePlugins((s) => s.loadPlugins)

  useLayoutEffect(() => {
    loadPlugins()
  }, [])
}
