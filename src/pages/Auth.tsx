import { useAuthPageState } from '@/store'
import Form from '@/components/forms'
import { changePassContext } from '@/components/forms/ChangePass'
import styles from './styles.module.css'
import { useSetPageTitle } from '@/hooks'
import { useUserTheme } from '@/store/theme'

export default function Auth() {
  const locale = useUserTheme(s => s.locale.auth)
  useSetPageTitle(locale.pageTitle)

  const type = useAuthPageState((s) => s.type)

  return (
    <changePassContext.Provider value={{ backToLogin: true }}>
      <div className={styles['centered-page']}>
        {type == 'login' ? (
          <Form.Login />
        ) : type == 'register' ? (
          <Form.Register />
        ) : (
          <Form.ChangePass />
        )}
      </div>
    </changePassContext.Provider>
  )
}
