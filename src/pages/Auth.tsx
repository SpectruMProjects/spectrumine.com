import { useAuthPageState } from "../store"
import Form from '../components/forms'
import styles from './styles.module.css'

export default function Auth() {
  const type = useAuthPageState(s => s.type)
  
  return <div className={styles['centered-page']}>
      {type == 'login' 
        ? <Form.Login /> 
        : <Form.Register />
      }
  </div>
}
