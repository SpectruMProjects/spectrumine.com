import { Button, Card, Divider, Spin, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuthPageState } from '@/store'
import styles from './styles.module.css'
import HardcoreStatistics from '@/components/HardcoreStatistics'
import {
  DownOutlined,
  EditOutlined,
  UserDeleteOutlined,
  UsergroupDeleteOutlined
} from '@ant-design/icons'
import { useState } from 'react'
import Forms from '@/components/forms'
import { useSetPageTitle } from '@/hooks'

export default function Profile() {
  useSetPageTitle('SpectruM - Профиль')

  const [authStatus, user, logout] = useAuthPageState((s) => [
    s.authStatus,
    s.user,
    s.logout
  ])
  const nav = useNavigate()
  const [isChangePassOpened, setIsChangePassOpened] = useState(false)

  if (authStatus == 'process' || authStatus == 'unknown')
    return (
      <div className={styles['centered-page']}>
        <Spin />
      </div>
    )

  if (!user)
    return (
      <div className={styles['centered-page']} style={{ padding: '2em' }}>
        <Card style={{ height: 'fit-content' }}>
          <Typography.Title>Вы не авторизованы</Typography.Title>
          <Button type="primary" onClick={() => nav('/auth')}>
            Войти
          </Button>
        </Card>
      </div>
    )

  return (
    <div className={styles['profile-page']}>
      <Card className={styles['profile-page__user']}>
        <div className={styles['profile-page__user__info']}>
          <p>{user.username}</p>
          <p className={styles['profile-page__user__info__email']}>
            {user.email}
          </p>
        </div>

        <Divider />

        <div className={styles['profile-page__user__buttons']}>
          <Button
            type={isChangePassOpened ? 'default' : 'primary'}
            size="large"
            icon={isChangePassOpened ? <DownOutlined /> : <EditOutlined />}
            onClick={() => setIsChangePassOpened((i) => !i)}
          >
            Изменить пароль
          </Button>

          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: '#f5222d' }}
            icon={<UserDeleteOutlined />}
            onClick={logout}
          >
            Выйти
          </Button>

          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: '#f5222d' }}
            icon={<UsergroupDeleteOutlined />}
            onClick={logout}
          >
            Выйти со всех устройств
          </Button>

          {isChangePassOpened && <Divider type="horizontal" />}
          {isChangePassOpened && <Forms.ChangePass />}
        </div>

        <Divider />
        <HardcoreStatistics username={user.username} />
      </Card>
    </div>
  )
}
