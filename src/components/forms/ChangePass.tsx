import { useAuthPageState } from '@/store'
import { Button, Card, Form, Input, message } from 'antd'
import { Rule } from 'antd/es/form'
import { createContext, useContext } from 'react'

const rules: Record<'email' | 'password', Rule[]> = {
  email: [
    { required: true, message: 'Почта обязательна' },
    { type: 'email', message: 'Введите валидную почту' }
  ],
  password: [
    { required: true, message: 'Пароль обязателен' },
    { min: 8, max: 32, message: 'Пароль должен быть длинее 8 и короче 32' },
    {
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
      message: 'Пароль должен содержать цифры, прописные и заглавные буквы'
    }
  ]
}

interface Form {
  email?: string
  newPassword: string
}

export default function ChangePass() {
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
        message.success('Проверьте почту')
      } else if (code == 'error') message.error(res[1])
    })
  }

  return (
    <Card style={{ padding: 28 }}>
      <Form form={form} onFinish={onFinish}>
        {!user && (
          <Form.Item name="email" rules={rules.email} required>
            <Input type="email" placeholder="Почта" autoComplete="email" />
          </Form.Item>
        )}

        <Form.Item name="newPassword" rules={rules.password} required>
          <Input type="password" placeholder="Новый пароль" />
        </Form.Item>

        <Form.Item>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 30 }}
              loading={status == 'process'}
            >
              Изменить
            </Button>

            {ctx.backToLogin && (
              <Button type="link" onClick={() => switchTo('login')}>
                Войти
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
