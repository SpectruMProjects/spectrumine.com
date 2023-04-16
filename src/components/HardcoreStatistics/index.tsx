import { useUserHardcoreStatistics } from '@/hooks'
import styles from './styles.module.css'
import { Card, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HardcoreStatistics as Model } from '@/models'

function formatDeaths(count: number) {
  if ([11, 12, 13, 14, 15, 17, 18, 19].includes(count)) return 'смертей'

  const last = count % 10
  if (last == 1) return 'смерть'
  if ([5, 6, 7, 8, 9, 0].includes(last)) return 'смертей'

  return 'смерти'
}

const formatter = Intl.DateTimeFormat('ru', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
})

function formatDate(date: Date) {
  return formatter.format(date)
}

function dateFormat(time: number) {
  let delta = Math.abs(time) / 1000

  const days = Math.floor(delta / 86400)
  delta -= days * 86400

  const hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  const minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60

  const seconds = Math.floor(delta % 60)

  const result = []
  result.push(days < 10 ? `0${days}` : days)
  result.push(hours < 10 ? `0${hours}` : hours)
  result.push(minutes < 10 ? `0${minutes}` : minutes)
  result.push(seconds < 10 ? `0${seconds}` : seconds)

  return result.join(':')
}

function formatTimeToRespawn(time: number) {
  const now = Date.now()
  return dateFormat(time - now)
}

interface Props {
  username: string
}

function map(model: Model): ComponentProps['statistics'] {
  return {
    deathCount: model.deaths.length,
    lastServerTime: model.lastServerTime,
    timeOnServer: model.timeOnServer,
    lastDeath: model.lastDeath
  }
}

export default function HardcoreStatistics({ username }: Props) {
  const [code, statistics] = useUserHardcoreStatistics(username)
  const nav = useNavigate()

  if (code == 'loading')
    return (
      <Card style={{ width: 'fit-content' }}>
        <Spin />
      </Card>
    )

  if (code == 'error')
    return (
      <Card style={{ width: 'fit-content' }}>
        Не удалось загрузить статистику
      </Card>
    )

  return (
    <HardcoreStatisticsComponent
      statistics={map(statistics)}
      onHardcoreClick={() => nav('/servers/hardcore')}
    />
  )
}

interface ComponentProps {
  statistics: {
    deathCount: number
    lastDeath?: {
      respawnTime: number
      issuer?: string
      issue: string
      time: number
    }
    lastServerTime: number
    timeOnServer: number
  }
  onHardcoreClick: () => void
}

export function HardcoreStatisticsComponent({
  onHardcoreClick,
  statistics
}: ComponentProps) {
  return (
    <Card style={{ width: 'fit-content' }}>
      <div className={styles['block']}>
        <p className={styles['title']}>
          Статистика{' '}
          <a
            href="/servers/hardcore"
            onClick={(e) => {
              e.preventDefault()
              onHardcoreClick()
            }}
          >
            HARDCORE
          </a>{' '}
          сервера
          <br />
        </p>

        <div className={styles['content']}>
          <div className={styles['content_outer']}>
            <div className={styles['deaths']}>
              <img
                src="/images/hcheart.png"
                alt="heart"
                className={styles['heart']}
              />
              <p>
                {statistics.deathCount} {formatDeaths(statistics.deathCount)}
              </p>
            </div>
          </div>
          {statistics.lastDeath?.respawnTime && (
            <div className={styles['inner']}>
              <Respawn rT={statistics.lastDeath?.respawnTime} />

              <div style={{ flex: 1, minHeight: 28 }} />

              {statistics.lastDeath != undefined && (
                <div className={styles['info']}>
                  <p>
                    Дата последней смерти{' '}
                    {formatDate(new Date(statistics.lastDeath.time))}
                  </p>
                  <p>
                    {statistics.lastDeath.issuer
                      ? `Был убит "${statistics.lastDeath.issuer}" при помощи "${statistics.lastDeath.issue}"`
                      : `Умер из-за "${statistics.lastDeath.issue}"`}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles['dop_info']}>
          <p>
            {statistics.lastServerTime != 0
              ? `Последний раз на сервере ${formatDate(
                  new Date(statistics.lastServerTime)
                )}`
              : 'Не заходил'}
          </p>
          <p>
            {statistics.timeOnServer != 0
              ? `Проведено времени на сервере ${dateFormat(
                  statistics.timeOnServer
                )}`
              : 'Не играл'}
          </p>
        </div>
      </div>
    </Card>
  )
}

function Respawn({ rT }: { rT: number }) {
  const [timeToRespawn, setTimeToRespawn] = useState('0:0:0:0')

  useEffect(() => {
    if (Date.now() > rT) {
      setTimeToRespawn('0:0:0:0')
      return
    }
    setTimeToRespawn(formatTimeToRespawn(rT))
    const id = setInterval(() => {
      if (Date.now() > rT) {
        setTimeToRespawn('0:0:0:0')
        clearInterval(id)
        return
      }
      setTimeToRespawn(formatTimeToRespawn(rT))
    }, 1000)
    return () => clearInterval(id)
  }, [rT])

  if (timeToRespawn == '0:0:0:0') return <></>

  return (
    <div className={styles['respawn']}>
      Возрождение через{' '}
      <p style={{ fontSize: '1.2em', color: '#f5222d' }}>{timeToRespawn}</p>
    </div>
  )
}
