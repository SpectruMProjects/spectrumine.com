import { useAuthPageState } from '@/store'
import Form from '@/components/forms'
import { changePassContext } from '@/components/forms/ChangePass'
import styles from './styles.module.css'
import { useSetPageTitle } from '@/hooks'

export default function Auth() {
  useSetPageTitle('SpectruM - Авторизация')

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
