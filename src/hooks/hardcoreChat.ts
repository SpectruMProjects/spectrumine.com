import { GetChatOkData, getChat } from '@/api'
import { useEffect, useState } from 'react'

export function useChat(server: string, delay = 15000) {
  const [state, setState] = useState<null | 'loading' | GetChatOkData>(null)

  useEffect(() => {
    setState('loading')
    getChat(server).then((res) => {
      setState(res.code === 'ok' ? res.data : null)

      const id = setInterval(() => {
        getChat(server).then((res) => {
          if (res.code === 'ok') setState(res.data)
        })
      }, delay)
      return () => clearInterval(id)
    })
  }, [delay])

  return state
}
