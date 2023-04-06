import { Button, Card, Divider, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuthPageState } from '@/store'
import styles from './styles.module.css'
import HardcoreStatistics from '@/components/HardcoreStatistics'

export default function Profile() {
  const [user, logout] = useAuthPageState(s => [s.user, s.logout])
  const nav = useNavigate()
  if (!user) 
    return <div 
      className={styles['centered-page']}
      style={{ padding: '2em' }}>
      <Card style={{ height: 'fit-content' }}>
      <Typography.Title>Вы не авторизованы</Typography.Title>
      <Button type='primary' onClick={() => nav('/auth')}>
        Войти
      </Button>
      </Card>
    </div>
  
  return <div className={styles['profile-page']}>
    <Card className={styles['profile-page__user']}>
      <Typography.Title>{user.username} {user.email}</Typography.Title>
      <Divider />
      <Button
        type='primary' 
        size='large' 
        style={{ backgroundColor: '#f5222d' }} 
        onClick={logout}>
      Выйти
      </Button>
    </Card>

    <Divider />

    <HardcoreStatistics />
  </div>
}
