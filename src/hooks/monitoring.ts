import { getServerOnline } from '@/api'
import { useEffect, useState } from 'react'

type State =
  | {
      online: false
    }
  | {
      online: true
      max: number
      current: number
    }

export function useHardcoreMonitor(delay: number, address: string): State {
  const [state, setState] = useState<State>({ online: false })

  useEffect(() => {
    const interval = setInterval(() => {
      getServerOnline(address).then((stat) => {
        if (!stat.online) {
          setState({ online: false })
        } else setState(stat)
      })
    }, delay)
    return () => clearInterval(interval)
  }, [delay, address])

  return state
}
