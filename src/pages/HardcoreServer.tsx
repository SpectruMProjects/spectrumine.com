import { List, Typography, message } from 'antd'
import styles from './styles.module.css'
import HardcoreMonitor from '@/components/HardcoreMonitor'
import { CopyOutlined } from '@ant-design/icons'

const points = [
  'Ванильный геймплей, минимальное количество плагинов для комфортной игры',
  'Только хардкор! Платите за свою смерть временем потраченным на сервере',
  'Ванильное выживание'
]

const hardcoreUrl = 'spectrum.com'

export default function HardcoreServer() {
  return (
    <div className={styles['hardcore-page']}>
      <h1 className={styles['hardcore-page__ip']}>
        Ip:
        <a 
          href={hardcoreUrl}
          onClick={(e) => {
            e.preventDefault()
            navigator.clipboard.writeText(hardcoreUrl)
              .then(() => { message.success('ip сервера скопирован') })
              .catch(() => { message.error('Не удалось скопировать ip.\nПопробуйте вручную') })
          }}>
            {hardcoreUrl} <CopyOutlined />
        </a>
      </h1>

      <HardcoreMonitor />

      <List
        size='large'
        className={styles['points']}
        header={<Header />}
        dataSource={points}
        renderItem={
          point => <List.Item>
            <p className={styles['point']}>{point}</p>
          </List.Item>
        }/>

      <div className={styles['description']}>
        <Typography.Title>
          <p style={{color: 'white', textAlign: 'center'}}>
            Как работает Hardcore режим?
          </p>
        </Typography.Title>
        <p className={styles['description_point']}>
          Если вы прошаренный игрок в Minecraft, то вы знаете, что режим Hardcore работает
          по принципу одной смерти. Однако на сервере эта механика очень расточительна, т.к. 
          по неосторожности можно потерять не только прогресс, но и возможность играть с друзьями.
        </p>
        <p className={styles['description_point']}>
          Поэтому мы сделали плагин, который даёт возможность возродиться спустя время, 
          которое вы провели на сервере.
        </p>
        <p className={styles['description_dop']}>
          *Для того чтобы точно расчитать время возрождения, мы пользуемся <a href="/formula">формулой</a>
        </p>
      </div>

      <div className={styles['about']}>
        <Typography.Title>
          <p style={{color: 'white', textAlign: 'center'}}>
            Ивенты, лёгкая сборка и прочее...
          </p>
        </Typography.Title>

        <p className={styles['point']}>
          Сервер на Paper, дружелюбное комьюнити, полностью бесплатное пользование, Discord сервер и другие плюшки.
          Регестрируйся и заходи на сервер        
        </p>
      </div>
    </div>
  )
}

function Header() {
  return <Typography.Title>
    <p style={{color: 'white', textAlign: 'center'}}>
      О сервере
    </p>
  </Typography.Title>
}