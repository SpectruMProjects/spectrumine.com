import { useParams } from 'react-router-dom'
import styles from './styles.module.css'
import HardcoreStatistics from '@/components/HardcoreStatistics'
import { useSetPageTitle } from '@/hooks'
import { useUserTheme } from '@/store/theme'

export default function UserHardcoreStatistics() {
  const locale = useUserTheme(s => s.locale.userHardcoreStatistics)
  useSetPageTitle(locale.pageTitle)

  const { username } = useParams()

  if (!username) return <></>

  return (
    <div className={styles['centered-page']}>
      <HardcoreStatistics username={username} />
    </div>
  )
}
