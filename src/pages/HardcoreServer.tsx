import { Typography, message } from 'antd'
import styles from './styles.module.css'
import HardcoreMonitor from '@/components/HardcoreMonitor'
import { CopyOutlined } from '@ant-design/icons'
import { useSetPageTitle } from '@/hooks'
import { useLayoutEffect } from 'react'

const points = [
  [
    'Vanilla',
    'Ванильный геймплей, минимальное количество плагинов для комфортной игры'
  ],
  [
    '<span>Hardcore</span>',
    'Только <span>хардкор</span>! Платите за свою смерть временем потраченным на сервере'
  ],
  ['SMP', 'Ванильное выживание']
]

const hardcoreUrl = '185.250.36.214:10100'

export default function HardcoreServer() {
  useSetPageTitle('SpectruM - Hardcore сервер')
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles['hardcore-page']}>
      <div className={styles['points__dup']}>
        <Typography.Title>
          <p className={styles['points__title']}>
            Vanilla <span>Hardcore</span> SMP
          </p>
        </Typography.Title>
      </div>
      <h1 className={styles['hardcore-page__ip']}>
        <a
          style={{ textAlign: 'center' }}
          href={hardcoreUrl}
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
          Скопировать IP <CopyOutlined />
        </a>
      </h1>

      <HardcoreMonitor />

      <div className={styles['points']}>
        <Typography.Title>
          <p className={styles['points__title']}>О сервере</p>
        </Typography.Title>
        <table className={styles['points__table']}>
          <tbody>
            {points.map((point) => (
              <tr key={point[0]}>
                <td>
                  <p
                    className={styles['point__prefix']}
                    dangerouslySetInnerHTML={{ __html: point[0] }}
                  />
                </td>
                <td>
                  <p
                    className={styles['point']}
                    dangerouslySetInnerHTML={{ __html: point[1] }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles['description']}>
        <Typography.Title>
          <p style={{ color: 'white', textAlign: 'center' }}>
            Как работает Hardcore режим?
          </p>
        </Typography.Title>
        <p className={styles['description_point']}>
          Если вы прошаренный игрок в Minecraft, то вы знаете, что режим
          Hardcore работает по принципу одной смерти. Однако на сервере эта
          механика очень расточительна, т.к. по неосторожности можно потерять не
          только прогресс, но и возможность играть с друзьями.
        </p>
        <p className={styles['description_point']}>
          Поэтому мы сделали плагин, который даёт возможность возродиться спустя
          время, которое вы провели на сервере.
        </p>
        {/* <p className={styles['description_dop']}>
          *Для того чтобы точно расчитать время возрождения, мы пользуемся{' '}
          <a href="/formula">формулой</a>
        </p> */}
      </div>
      <div className={styles['description']}>
        <Typography.Title>
          <p style={{ color: 'white', textAlign: 'center' }}>Голосовой чат</p>
        </Typography.Title>
        <p className={styles['description_point']}>
          На сервере присутствует плагин PlasmoVoice для голосового общения
          внутри игры. Установите его на свой клиент и играйте вместе с другими
          используя голосовой чат!
        </p>
      </div>
      <div className={styles['about']}>
        <Typography.Title>
          <p style={{ color: 'white', textAlign: 'center' }}>
            Ивенты, лёгкая сборка и прочее...
          </p>
        </Typography.Title>

        <p className={styles['point']}>
          Сервер на Paper, дружелюбное комьюнити, полностью бесплатное
          пользование, Discord сервер и другие плюшки. Регистрируйтесь и
          заходите на сервер!
        </p>
      </div>
    </div>
  )
}
