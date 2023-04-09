import { Button, Card, Divider, Form, Input, message } from "antd";
import { Rule } from "antd/es/form";
import { useNavigate } from "react-router-dom";
import { useAuthPageState } from "../../store";
import { UserOutlined } from "@ant-design/icons";
import { createContext } from "react";

const rules: Record<'username' | 'password', Rule[]> = {
  'username': [
    { required: true, message: 'Ник обязателен' },
    { min: 3, max: 16, message: 'Ник должен быть длинее 3 и короче 16' },
    { pattern: /^[a-zA-Z0-9_]{3,16}$/, message: 'Ник должен содержать только латинские буквы и цифры' }
  ],
  'password': [
    { required: true, message: 'Пароль обязателен' },
    { min: 8, max: 32, message: 'Пароль должен быть длинее 8 и короче 32' },
    { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/, message: 'Пароль должен содержать цифры, прописные и заглавные буквы' }
  ]
}

interface Form {
  username: string
  password: string
}

export default function Login() {
  const [login, status] = useAuthPageState(s => [s.login, s.loginStatus])
  const [form] = Form.useForm<Form>()
  const nav = useNavigate()
  const switchToRegister = useAuthPageState(s => s.switchType)
  
  function onFinish(data: Form) {
    login(data).then(code => {
      if (code == 'error')
        message.error('Ошибка 🤓. Отсоси')
      else if (code == 'ok') {
        nav('/')
      }
    })
  }

  return (
    <Card style={{ padding: 28 }}>
      <Form 
        form={form}
        onFinish={onFinish}>
        <Form.Item 
          name='username'
          rules={rules.username}
          required>
          <Input placeholder="Ник в Minecraft"/>
        </Form.Item>

        <Form.Item 
          name='password'
          rules={rules.password}
          required>
          <Input type="password" placeholder="Пароль"/>
        </Form.Item>

        <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 30 }}
              loading={status == 'process'}
              icon={<UserOutlined />}
            >
              Войти
            </Button>
        </Form.Item>

        <Form.Item>
          <Button type="link" onClick={() => switchToRegister()}>
              Нет аккаунта?
            </Button>

            <Button type="link" onClick={() => switchToRegister('change pass')}>
              Забыли пароль?
            </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
