import { useNavigate, useParams } from "react-router-dom"
import styles from './styles.module.css'
import { Button, Checkbox, Divider, Input, message } from "antd"
import { useChangePassState } from "@/store/changePass"
import { useState } from "react"

export default function ActivateChangePassCode() {
  const {code} = useParams()
  const [activate, state] = useChangePassState(s => [s.activate, s.state])
  const nav = useNavigate()
  const [logout, setLogout] = useState(true)

  function onClick() {
    activate(code!, logout).then(status => {
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
    <div className={styles['centered-page']} style={{ flexDirection: 'column' }}>
      <Checkbox 
        style={{ margin: 16 }} 
        defaultChecked
        onChange={() => setLogout(l => !l)}>
        Выйти со всех устройств
      </Checkbox>

      <div>
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
    </div>
  )
}
