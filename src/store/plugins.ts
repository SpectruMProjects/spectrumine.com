import { Plugin } from '@/core'
import { loadPlugin } from '@/plugins'
import { create } from 'zustand'

interface PluginsState {
  plugins: Plugin[]

  loadPlugins(): Promise<void>
}

export const usePlugins = create<PluginsState>((set, get) => ({
  plugins: [],
  async loadPlugins() {
    const plugins: Plugin[] = (
      (await Promise.all(
        ((import.meta.env.VITE_PLUGINS ?? '') as string)
          .split(',')
          .filter((name) => name !== '')
          .map(loadPlugin)
      )) as Plugin[]
    ).filter((plugin) => plugin !== null)
    set({
      plugins
    })
  }
}))
