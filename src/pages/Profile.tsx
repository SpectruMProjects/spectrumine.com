import { Button, Card, Divider, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuthPageState } from '@/store'
import styles from './styles.module.css'
import { HardcoreStatistics as HardcoreStatisticsModel } from '@/models'
import HardcoreStatistics from '@/components/HardcoreStatistics'
import { DownOutlined, EditOutlined, UserDeleteOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
import Forms from '@/components/forms'  

export default function Profile() {
  const [user, logout] = useAuthPageState(s => [s.user, s.logout])
  const nav = useNavigate()
  const [isChangePassOpened, setIsChangePassOpened] = useState(false)

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
      <div className={styles['profile-page__user__buttons']}>
        <Button
          type={isChangePassOpened ? 'default' : 'primary'} 
          size='large' 
          icon={isChangePassOpened ? <DownOutlined /> : <EditOutlined />}
          onClick={() => setIsChangePassOpened(i => !i)}>
          Изменить пароль
        </Button>

        <Button
          type='primary' 
          size='large' 
          style={{ backgroundColor: '#f5222d' }} 
          icon={<UserDeleteOutlined />}
          onClick={logout}>
          Выйти
        </Button>

        <Button
          type='primary' 
          size='large' 
          style={{ backgroundColor: '#f5222d' }} 
          icon={<UsergroupDeleteOutlined />}
          onClick={logout}>
          Выйти со всех устройств
        </Button>

        {isChangePassOpened && <Divider type='horizontal' />}
        {isChangePassOpened && <Forms.ChangePass />}
      </div>
    </Card>

    <Divider />

    <HardcoreStatistics username={user.username}/>
  </div>
}
