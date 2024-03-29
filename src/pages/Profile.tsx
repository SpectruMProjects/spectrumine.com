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
import { useLayoutEffect, useState } from 'react'
import Forms from '@/components/forms'
import { useSetPageTitle } from '@/hooks'
import { useUserTheme } from '@/store/theme'
// import ProductsList from '@/components/ProductsList'

export default function Profile() {
  const locale = useUserTheme((s) => s.locale.profile)
  useSetPageTitle(locale.pageTitle)
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [authStatus, user, logout] = useAuthPageState((s) => [
    s.authStatus,
    s.user,
    s.logout
  ])
  const nav = useNavigate()
  const [isChangePassOpened, setIsChangePassOpened] = useState(false)
  // const [hats, loadHats, loadHatsState] = useInventoryState((s) => [
  //   s.hats,
  //   s.load,
  //   s.loadingState
  // ])

  // useEffect(() => {
  //   loadHats()
  // }, [])

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
          <Typography.Title>{locale.needAuth}</Typography.Title>
          <Button type="primary" onClick={() => nav('/auth')}>
            {locale.auth}
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
            {locale.changePass}
          </Button>

          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: '#f5222d' }}
            icon={<UserDeleteOutlined />}
            onClick={logout}
          >
            {locale.logOut}
          </Button>

          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: '#f5222d' }}
            icon={<UsergroupDeleteOutlined />}
            onClick={logout}
          >
            {locale.logOutFromAllDevices}
          </Button>

          {isChangePassOpened && <Divider type="horizontal" />}
          {isChangePassOpened && <Forms.ChangePass />}
        </div>

        <Divider />
        <HardcoreStatistics username={user.username} />

        {/* <Divider />
        <h2 style={{ textAlign: 'center' }}>Инвентарь</h2>
        {loadHatsState == 'process' ? (
          <Spin />
        ) : hats?.length != 0 ? (
          <ProductsList.Hat hats={hats ?? []} showPrice={false} />
        ) : (
          <div style={{ textAlign: 'center' }}>
            Пусто. Посетите наш{' '}
            <a
              href="/store"
              onClick={(e) => {
                e.preventDefault()
                nav('/store')
              }}
            >
              магазин
            </a>
          </div>
        )} */}
      </Card>
    </div>
  )
}
