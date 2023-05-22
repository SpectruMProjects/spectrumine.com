import { useAuthPageState } from '@/store'
import { Button, Card, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useUserItems } from '../store'
import { useEffect } from 'react'
import UserItem from '../components/UserItem'
import styles from './Main.module.css'

export default function Main() {
  const userId = useAuthPageState((s) => s.user?.id)
  const nav = useNavigate()

  if (!userId)
    return (
      <div
        style={{
          padding: '2em',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Card style={{ height: 'fit-content' }}>
          <Typography.Title>Вы не авторизованы</Typography.Title>
          <Button type="primary" onClick={() => nav('/auth')}>
            Войти
          </Button>
        </Card>
      </div>
    )

  return <Component userId={userId} />
}

interface ComponentProps {
  userId: string
}
function Component({ userId }: ComponentProps) {
  const [items, load] = useUserItems((s) => [s.items, s.loadItems])

  useEffect(() => {
    load(userId)
  }, [userId])

  return (
    <div className={styles['page']}>
      {items?.map((i) => (
        <UserItem item={i} key={i.item.id} />
      ))}
    </div>
  )
}
