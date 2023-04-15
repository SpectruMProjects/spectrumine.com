import { HatProduct } from "@/models";
import { create } from "zustand";

interface HatProductsState {
  hats?: HatProduct[]

  loadState: 'unknown' | 'process' | 'ok' | 'error'

  load(): Promise<HatProductsState['loadState']>
}

export const useHatProductsState = create<HatProductsState>((set, get) => ({
  loadState: 'process',

  async load() {
    await wait(2000)
    const hats = Array(10).fill(0).map((_, i) => new HatProduct(
      i.toString(),
      (i*1000).toString(),
      `name ${i}`,
      `description description 🤓 description description 🤓 description description description 🤓 ${i}`,
      '/images/bg-main.gif'
    ))
    set({ loadState: 'ok', hats })
    return 'ok'
  }
}))

function wait(delay: number) {
  return new Promise(res=>setTimeout(res, delay))
}