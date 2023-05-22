import { useSetPageTitle } from '@/hooks'
import MainPagePreview from '../components/MainPagePreview'
import Servers from '../components/servers'
import { useLayoutEffect } from 'react'
import { useUserTheme } from '@/store/theme'

export default function Main() {
  const locale = useUserTheme(s =>s.locale.main)
  useSetPageTitle(locale.pageTitle)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <MainPagePreview />
      <Servers />
    </div>
  )
}
