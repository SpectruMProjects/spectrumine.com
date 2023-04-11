import { useParams } from "react-router-dom"
import styles from './styles.module.css'
import HardcoreStatistics from "@/components/HardcoreStatistics"

export default function UserHardcoreStatistics() {
  const { username } = useParams()

  if (!username)
    return <></>

  return (
    <div className={styles['centered-page']}>
      <HardcoreStatistics username={username}/>
    </div>
  )
}
