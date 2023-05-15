import { Plugin } from '@/core'
import { create } from 'zustand'

interface PluginsState {
  plugins: Plugin[]

  addPlugin(plugin: Plugin): void
}

export const usePlugins = create<PluginsState>((set, get) => ({
  plugins: [],
  addPlugin(plugin) {
    set({
      plugins: [...get().plugins, plugin]
    })
  }
}))
