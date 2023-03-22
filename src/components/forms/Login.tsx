import { Button, Card, Form, Input } from "antd";
import { Rule } from "antd/es/form";
import { useAuthPageState } from "../../store";

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

export default function Login() {
  const [form] = Form.useForm()
  const switchToRegister = useAuthPageState(s => s.switchType)
  
  return (
    <Card style={{ padding: 28 }}>
      <Form 
        form={form}>
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
          <div>
            <Button type="primary" htmlType="submit" style={{ marginRight: 30 }}>
              Войти
            </Button>

            <Button type="default" onClick={() => switchToRegister()}>
              Нет аккаунта?
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  )
}
