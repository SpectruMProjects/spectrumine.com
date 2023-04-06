import { Button, Card, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuthPageState } from '../store'


const rootStyle = { 
  height: '100%',
  width: '100%', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center' 
}

export default function Profile() {
  const [user, logout] = useAuthPageState(s => [s.user, s.logout])
  const nav = useNavigate()
  if (!user) 
    return <div 
      style={rootStyle}>
      <Card style={{ height: 'fit-content' }}>
      <Typography.Title>ТЫ {'[маленькая губка]!'}</Typography.Title>
      <Button type='primary' onClick={() => nav('/auth')}>
        СТАТЬ [БОЛЬШАЯ ШИШКА]
      </Button>
      </Card>
    </div>
  
  return <div style={rootStyle}><Card>
    <Typography.Title>ТЫ {`[${JSON.stringify(user)}]`}</Typography.Title>
    <Button
      type='primary' 
      size='large' 
      style={{ backgroundColor: '#f5222d' }} 
      onClick={logout}>
      Выйти
    </Button>
  </Card></div>
}
