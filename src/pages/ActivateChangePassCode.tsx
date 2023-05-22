import { useNavigate, useParams } from 'react-router-dom'
import styles from './styles.module.css'
import { Button, Checkbox, Divider, message } from 'antd'
import { useChangePassState } from '@/store/changePass'
import { useState } from 'react'
import { useSetPageTitle } from '@/hooks'
import { useUserTheme } from '@/store/theme'

export default function ActivateChangePassCode() {
  const locale = useUserTheme(s => s.locale.activateChangePass)
  useSetPageTitle(locale.pageTitle)

  const { code } = useParams()
  const [activate, state] = useChangePassState((s) => [s.activate, s.state])
  const nav = useNavigate()
  const [logout, setLogout] = useState(true)

  function onClick() {
    code &&
      activate(code, logout).then((status) => {
        if (status[0] == 'ok') {
          message.success(locale.passwordChanged)
          nav('/')
        } else if (status[0] == 'error') {
          message.error(status[1])
        } else {
          message.error(locale.passwordChanged)
        }
      })
  }

  return (
    <div
      className={styles['centered-page']}
      style={{ flexDirection: 'column' }}
    >
      <Checkbox
        style={{ margin: 16 }}
        defaultChecked
        onChange={() => setLogout((l) => !l)}
      >
        {locale.logOutFromAllDevices}
      </Checkbox>

      <div>
        <Button
          shape='round'
          loading={state == 'process'}
          type="primary"
          disabled={state != 'unknown'}
          onClick={onClick}
        >
          {locale.changePass}
        </Button>

        <Divider type="vertical" />

        <Button type="link" onClick={() => nav('/')}>
          {locale.toMain}
        </Button>
      </div>
    </div>
  )
}
