import { useParams } from "react-router-dom"
import styles from './styles.module.css'
import HardcoreStatistics from "@/components/HardcoreStatistics"
import { useSetPageTitle } from "@/hooks"

export default function UserHardcoreStatistics() {
  useSetPageTitle('SpectrumM - Статистика')
  
  const { username } = useParams()

  if (!username)
    return <></>

  return (
    <div className={styles['centered-page']}>
      <HardcoreStatistics username={username}/>
    </div>
  )
}
