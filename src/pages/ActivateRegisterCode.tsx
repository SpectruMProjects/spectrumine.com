import { message, Spin } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthPageState } from '../store'
import { useSetPageTitle } from '@/hooks'

export default function ActivateRegisterCode() {
  useSetPageTitle('SpectruM - Подтверждение регистрации')
  
  const [activate, status] = useAuthPageState(s => [
    s.activateRegisterCode, 
    s.activateRegisterCodeStatus
  ])
  const code = useParams()?.['code']
  const nav = useNavigate()

  useEffect(() => {
    code && activate(code).then(r => {
      const code = r[0]
      if (code == 'ok') {
        nav('/')
      } else if (code == 'error') {
        message.error(r[1])
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
