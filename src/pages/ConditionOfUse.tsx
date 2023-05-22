import { Divider, List } from 'antd'
import styles from './styles.module.css'
import { useSetPageTitle } from '@/hooks'
import { useLayoutEffect } from 'react'
import {Typography} from 'antd'
import { useUserTheme } from '@/store/theme'

export default function ConditionOfUse() {
  const locale = useUserTheme(s => s.locale.conditionOfUse)
  useSetPageTitle(locale.pageTitle)
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles['condition-of-use']}>
      <Typography.Text className={styles['condition-of-use__header']}>
        {locale.definitions}
      </Typography.Text>

      {locale.conditions.map((condition, i) => <>
        <Divider />

        <List
          bordered
          header={<h1>{`${i+1}. ` + condition[0]}</h1>}
          dataSource={condition[1]}
          renderItem={(p, i2) => (
            <List.Item>
              <p>{`${i+1}.${i2+1}. `}{p}</p>
            </List.Item>
          )}
        />
      </>)}
    </div>
  )
}
