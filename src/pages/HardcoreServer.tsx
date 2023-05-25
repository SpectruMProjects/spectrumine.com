import { Typography, message } from 'antd'
import styles from './styles.module.css'
import sls from './HardcoreServer.module.css'
import HardcoreMonitor from '@/components/HardcoreMonitor'
import { CopyOutlined } from '@ant-design/icons'
import { useSetPageTitle } from '@/hooks'
import { useLayoutEffect } from 'react'
import { useUserTheme } from '@/store/theme'

const hardcoreUrl = import.meta.env.VITE_HARDCORE_IP

export default function HardcoreServer() {
  const locale = useUserTheme((s) => s.locale.hardcoreServer)
  useSetPageTitle(locale.pageTitle)
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles['hardcore-page'] + ' ' + sls['page']}>
      <div className={styles['points__dup']}>
        <Typography.Title style={{ display: 'inline' }}>
          <p className={styles['points__title']}>
            Vanilla <span>Hardcore</span> SMP
          </p>
        </Typography.Title>
        <br />
        <br />
        <a
          href={hardcoreUrl}
          className={styles['hardcore-page__ip']}
          onClick={(e) => {
            e.preventDefault()
            navigator.clipboard
              .writeText(hardcoreUrl)
              .then(() => {
                message.success(`IP сервера ${hardcoreUrl} скопирован`)
              })
              .catch(() => {
                message.error('Не удалось скопировать ip.\nПопробуйте вручную')
              })
          }}
        >
          {locale.ipAddress} <CopyOutlined />
        </a>
      </div>

      <HardcoreMonitor />

      <div className={sls['points']}>
        {locale.points.map((point) => (
          <div key={point.title} className={sls['point']}>
            <img
              className={sls['icon']}
              src={point.icon}
              alt={point.title + ' icon'}
            />
            <span className={sls['title']}>{point.title}</span>
            <span className={sls['description']}>{point.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
