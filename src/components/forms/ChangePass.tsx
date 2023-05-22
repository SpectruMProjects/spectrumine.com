import { useAuthPageState } from '@/store'
import { useUserTheme } from '@/store/theme'
import { Button, Card, Form, Input, message } from 'antd'
import { createContext, useContext } from 'react'
import Inputs from './inputs'

interface Form {
  email?: string
  newPassword: string
}

export default function ChangePass() {
  const locale = useUserTheme((s) => s.locale.forms)
  const [change, status, user, switchTo] = useAuthPageState((s) => [
    s.changePass,
    s.changePassStatus,
    s.user,
    s.switchType
  ])
  const [form] = Form.useForm<Form>()
  const ctx = useContext(changePassContext)

  function onFinish(data: Form) {
    change(data.newPassword, data.email).then((res) => {
      const code = res[0]
      if (code == 'ok') {
        message.success(locale.email.checkMailbox)
      } else if (code == 'error') message.error(res[1])
    })
  }

  return (
    <Card style={{ padding: 28 }}>
      <Form form={form} onFinish={onFinish}>
        {!user && <Inputs.Email />}
        <Inputs.NewPassword />

        <Form.Item>
          <div>
            <Button
              shape="round"
              type="primary"
              htmlType="submit"
              style={{ marginRight: 30 }}
              loading={status == 'process'}
            >
              {locale.change}
            </Button>

            {ctx.backToLogin && (
              <Button type="link" onClick={() => switchTo('login')}>
                {locale.login}
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </Card>
  )
}

interface ChangePassContext {
  backToLogin: boolean
}

export const changePassContext = createContext<ChangePassContext>({
  backToLogin: false
})
