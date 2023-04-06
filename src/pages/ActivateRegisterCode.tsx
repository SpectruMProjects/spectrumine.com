import { message, Progress, Spin } from "antd"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthPageState } from "../store"

export default function ActivateRegisterCode() {
  const [activate, status] = useAuthPageState(s => [
    s.activateRegisterCode, 
    s.activateRegisterCodeStatus, 
    s.user
  ])
  const code = useParams()?.['code']
  const nav = useNavigate()

  useEffect(() => {
    activate(code!).then(r => {
      if (r == 'error') {
        message.error('Не удалось подтвердить почту')
      } else if (r == 'process')  {
        message.success(`Вы вошли как ${''}`)
        nav('/')
      } 
    })
  }, [])

  return (
    <Spin
      spinning={status === 'process'}
      style={{ margin: 'auto' }}
      tip='Подтверждение регистрации'/>
  )
}
