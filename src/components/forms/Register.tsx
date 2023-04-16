import { Button, Card, Form, Input, message } from 'antd'
import { Rule } from 'antd/es/form'
import { useAuthPageState } from '@/store'
import { useState } from 'react'
import { useDebounce } from '@/core'
import { UserAddOutlined } from '@ant-design/icons'

const rules: Record<'username' | 'email' | 'password', Rule[]> = {
  username: [
    { required: true, message: 'Ник обязателен' },
    { min: 3, max: 16, message: 'Ник должен быть длинее 3 и короче 16' },
    {
      pattern: /^[a-zA-Z0-9_]{3,16}$/,
      message: 'Ник должен содержать только латинские буквы и цифры'
    }
  ],
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
  username: string
  email: string
  password: string
}

export default function Register() {
  const [register, status, checkUsername] = useAuthPageState((s) => [
    s.register,
    s.registerStatus,
    s.checkUsername
  ])
  const [form] = Form.useForm<Form>()
  const switchToLogin = useAuthPageState((s) => s.switchType)

  function onFinish(data: Form) {
    register(data).then((result) => {
      switch (result[0]) {
        case 'ok':
          message.success('Аккаунт ушёл на подтверждение! Проверьте почту', 3)
          form.resetFields()
          break
        case 'error':
          message.error(result[1], 3)
      }
    })
  }

  const [username, setUsername] = useState<string | undefined>(undefined)
  const [usernameW, setUsernameW] = useState<boolean>(false)
  const [usernameH, setUsernameH] = useState<undefined | string>(undefined)
  useDebounce(
    (username) => {
      if (!username) return
      if (form.getFieldError('username').length != 0) {
        return
      } else {
        setUsernameW(false)
        setUsernameH(undefined)
      }

      checkUsername(username).then((result) => {
        setUsernameW(result == 'error')
        setUsernameH(
          result == 'error'
            ? 'Не существует аккаунта с этим ником в Monang'
            : undefined
        )
      })
    },
    1000,
    username
  )

  return (
    <Card style={{ padding: 28 }}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={rules.username}
          validateStatus={usernameW ? 'warning' : undefined}
          help={usernameH}
          required
        >
          <Input
            placeholder="Ник в Minecraft"
            autoComplete="username"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            allowClear
          />
        </Form.Item>

        <Form.Item name="email" rules={rules.email} required>
          <Input
            type="email"
            placeholder="Почта"
            autoComplete="email"
            allowClear
          />
        </Form.Item>

        <Form.Item name="password" rules={rules.password} required>
          <Input
            type="password"
            placeholder="Пароль"
            autoComplete="password"
            allowClear
          />
        </Form.Item>

        <Form.Item>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 30 }}
              loading={status == 'process'}
              icon={<UserAddOutlined />}
            >
              Регистрация
            </Button>

            <Button type="link" onClick={() => switchToLogin()}>
              Есть аккаунт?
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  )
}
