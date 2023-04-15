import { getServerOnline } from '@/api'
import { useEffect, useState } from 'react'

export function useHardcoreMonitor(
  delay: number, 
  address: string
): { max: number, current: number } {
  const [state, setState] = useState({ max: 0, current: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      getServerOnline(address).then(stat => {
        if(!stat.online) return
        setState(stat)
      })
    }, delay)
    return () => clearInterval(interval)
  }, [delay, address])

  return state
}