import { Divider, List } from 'antd'
import styles from './styles.module.css'
import { useSetPageTitle } from '@/hooks'
import { useLayoutEffect } from 'react'
import { useUserTheme } from '@/store/theme'

export default function ConditionOfUse() {
  const locale = useUserTheme(s => s.locale.rules)
  useSetPageTitle(locale.pageTitle)
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles['condition-of-use']}>
      
      {locale.rules.map((rule, i) => <>
        <Divider />

        <List
          bordered
          header={<h1>{`${i+1}. ` + rule[0]}</h1>}
          dataSource={rule[1]}
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