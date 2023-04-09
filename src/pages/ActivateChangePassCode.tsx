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
      if (status != 'ok') {
        message.error('Не удалось изменить пароль')
      } else {
        message.success('Пароль изменён')
        nav('/')
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
