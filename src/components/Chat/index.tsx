/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Spin, Typography } from 'antd'
import styles from './style.module.css'
import { useUserTheme } from '@/store/theme'
import { CSSProperties } from 'react'
import { useChat } from '@/hooks'

interface Props {
  server: string
  className?: string
  style?: CSSProperties
}

export default function Chat({ server, ...props }: Props) {
  const locale = useUserTheme((s) => s.locale.hardcoreChat)
  const chat = useChat(server)

  return <Component messages={chat} locale={locale} {...props} />
}

interface ComponentProps {
  messages:
    | {
        username: string
        time: Date | number
        text: string
      }[]
    | 'loading'
    | null

  locale: {
    chat: string
    cantLoad: string
  }

  className?: string
  style?: CSSProperties
}

const formatter = Intl.DateTimeFormat('ru', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})
function format(time: Date | number) {
  return `[${formatter.format(new Date(time))}]`
}

export function Component({ messages, locale, ...props }: ComponentProps) {
  if (messages === 'loading')
    return (
      <div {...props}>
        <Typography.Title>{locale.chat}</Typography.Title>
        <Spin />
      </div>
    )

  if (!messages)
    return (
      <div {...props}>
        <Typography.Title>{locale.chat}</Typography.Title>
        <Typography.Text type="danger">{locale.cantLoad}</Typography.Text>
      </div>
    )

  return (
    <div {...props}>
      <Typography.Title>{locale.chat}</Typography.Title>
      <table className={styles['table']}>
        <tbody>
          {messages.map((message) => (
            <tr key={message.time + message.username}>
              <td>
                <img
                  src={`${import.meta.env.VITE_HEAD_URL}/${message.username}`}
                />
              </td>
              <td>
                <Typography.Text type="secondary">
                  {format(message.time)}
                </Typography.Text>
              </td>
              <td>
                <Typography.Text className={styles['username']}>
                  {message.username}
                </Typography.Text>{' '}
                <Typography.Text>{message.text}</Typography.Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
