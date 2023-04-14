import { getHardcorePlayersOnServer } from "@/api";
import { useEffect, useState } from "react";

export function useHardcoreMonitor(delay: number, address: string): { max: number, current: number }{
  const [state, setState] = useState({ max: 0, current: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      getHardcorePlayersOnServer(address).then(stat => {
        if(stat == null)
        {
          return
        }
        setState(stat)
      })
    }, delay)
    return () => clearInterval(interval)
  }, [delay])

  return state
}