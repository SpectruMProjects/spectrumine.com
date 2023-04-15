import { HatProduct } from "@/models";
import { create } from "zustand";

interface HatProductsState {
  hats?: HatProduct[]

  loadState: 'unknown' | 'process' | 'ok' | 'error'
}

export const useHatProductsState = create<HatProductsState>((set, get) => ({
  loadState: 'unknown'
}))