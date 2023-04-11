import { useNavigate, useParams } from "react-router-dom"
import styles from './styles.module.css'
import { Button, Divider, message } from "antd"
import { useChangePassState } from "@/store/changePass"

export default function ActivateChangePassCode() {
  const {code} = useParams()
  const [activate, state] = useChangePassState(s => [s.activate, s.state])
  const nav = useNavigate()

  function onClick() {
    activate(code!).then(status => {
      if (status[0] == 'ok') {
        message.success('Пароль изменён')
        nav('/')
      } else if (status[0] == 'error') {
        message.error(status[1])
      } else {
        message.error('Не удалось изменить пароль')        
      }
    })
  }

  return (
    <div className={styles['centered-page']}>
      <Button 
        loading={state == 'process'}
        type="primary"
        disabled={state != 'unknown'}
        onClick={onClick}>
        Изменить пароль
      </Button>

      <Divider type='vertical'/>

      <Button type='link' onClick={() => nav('/')}>
        На главную
      </Button>
    </div>
  )
}
