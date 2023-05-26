import { GetHardcoreTopOkData, getHardcoreTop } from '@/api'
import { useEffect, useState } from 'react'

export function useHardcoreTop(delay = 60000) {
  const [state, setState] = useState<GetHardcoreTopOkData | null | 'loading'>(
    null
  )

  useEffect(() => {
    setState('loading')

    getHardcoreTop().then((res) => {
      setState(res.code === 'ok' ? res.data : null)
    })
    const id = setInterval(() => {
      if (document.hidden) return
      getHardcoreTop().then((res) => {
        if (res.code === 'ok') setState(res.data)
      })
    }, delay)
    return () => clearInterval(id)
  }, [delay])

  return state
}
