import { useSetPageTitle } from '@/hooks'
import MainPagePreview from '../components/MainPagePreview'
import Servers from '../components/servers'
import { useLayoutEffect } from 'react'

export default function Main() {
  useSetPageTitle('SpectruM - Сервера Minecraft')

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <MainPagePreview />
      <Servers />
    </div>
  )
}
