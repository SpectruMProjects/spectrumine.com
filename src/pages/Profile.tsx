import { Button, Card, Divider, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuthPageState } from '@/store'
import styles from './styles.module.css'
import HardcoreStatistics from '@/components/HardcoreStatistics'
import { EditOutlined, UserDeleteOutlined } from '@ant-design/icons'

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
      <h1 style={{ fontSize: '5vw' }}>
        {user.username} <br/> {user.email}
      </h1>
      <Divider />
      <div>
        <Button
          type='primary' 
          size='large' 
          icon={<EditOutlined />}
          onClick={logout}>
          Изменить пароль
        </Button>

        <Divider type='vertical' />

        <Button
          type='primary' 
          size='large' 
          style={{ backgroundColor: '#f5222d' }} 
          icon={<UserDeleteOutlined />}
          onClick={logout}>
          Выйти
        </Button>
      </div>
    </Card>

    <Divider />

    <HardcoreStatistics />
  </div>
}
