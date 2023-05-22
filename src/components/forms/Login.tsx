import { Button, Card, Form, Typography, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuthPageState } from '../../store'
import { UserOutlined } from '@ant-design/icons'
import Inputs from './inputs'
import { useUserTheme } from '@/store/theme'

interface Form {
  identifier: string
  password: string
}

export default function Login() {
  const [locale, localeWords] = useUserTheme((s) => [
    s.locale.forms,
    s.locale.words
  ])
  const [login, status] = useAuthPageState((s) => [s.login, s.loginStatus])
  const [form] = Form.useForm<Form>()
  const nav = useNavigate()
  const switchToRegister = useAuthPageState((s) => s.switchType)

  function onFinish(data: Form) {
    login(data).then((res) => {
      const code = res[0]
      if (code == 'ok') {
        nav('/')
      } else if (code == 'error') {
        message.error(res[1])
      } else {
        message.error(localeWords.unknownError)
      }
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography.Title>{locale.login}</Typography.Title>
      </div>
      <Card style={{ padding: 28 }}>
        <Form form={form} onFinish={onFinish}>
          <Inputs.Identifier />
          <Inputs.Password />

          <Form.Item>
            <Button
              shape="round"
              type="primary"
              htmlType="submit"
              style={{ marginRight: 30 }}
              loading={status == 'process'}
              icon={<UserOutlined />}
            >
              {locale.login}
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" onClick={() => switchToRegister()}>
              {locale['noAccount?']}
            </Button>

            <Button type="link" onClick={() => switchToRegister('change pass')}>
              {locale['forgotPassword?']}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
