import { Button, Card, Form, Typography, message } from 'antd'
import { useAuthPageState } from '@/store'
import { UserAddOutlined } from '@ant-design/icons'
import { useUserTheme } from '@/store/theme'
import Inputs from './inputs'

interface Form {
  username: string
  email: string
  password: string
}

export default function Register() {
  const [register, status] = useAuthPageState((s) => [
    s.register,
    s.registerStatus
  ])
  const [form] = Form.useForm<Form>()
  const switchToLogin = useAuthPageState((s) => s.switchType)
  const locale = useUserTheme((s) => s.locale.forms)

  function onFinish(data: Form) {
    register(data).then((result) => {
      switch (result[0]) {
        case 'ok':
          message.success(locale.successRegister, 3)
          form.resetFields()
          break
        case 'error':
          message.error(result[1], 3)
      }
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography.Title>{locale.register}</Typography.Title>
      </div>
      <Card style={{ padding: 28 }}>
        <Form form={form} onFinish={onFinish}>
          <Inputs.Username />
          <Inputs.Email />
          <Inputs.Password />

          <Form.Item>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 30 }}
                loading={status == 'process'}
                icon={<UserAddOutlined />}
              >
                {locale.register}
              </Button>

              <Button type="link" onClick={() => switchToLogin()}>
                {locale['hasAccount?']}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
