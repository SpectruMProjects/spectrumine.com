import { useAuthPageState } from "@/store"
import { SaveOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, message } from "antd"

const rules = {
  'password': [
    { required: true, message: 'Пароль обязателен' },
    { min: 8, max: 32, message: 'Пароль должен быть длинее 8 и короче 32' },
    { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/, message: 'Пароль должен содержать цифры, прописные и заглавные буквы' }
  ]
}

interface Form {
  newPassword: string
}

export default function ChangePass() {
  const [change, status] = useAuthPageState(s => [s.changePass, s.changePassStatus])  
  const [form] = Form.useForm<Form>()
  
  function onFinish(data: Form) {
    change(data.newPassword).then(code => {
      if (code == 'error')
        message.error('Ошибка 🤓. Отсоси')
      else if (code == 'ok') {
        message.success('Пароль успешно сменён')
      }
    })
  }

  return (
    <Card style={{ padding: 28 }}>
      <Form 
        form={form}
        onFinish={onFinish}>
        <Form.Item 
          name='newPassword'
          rules={rules.password}
          required>
          <Input type="password" placeholder="Новый пароль"/>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: 30 }}
            loading={status == 'process'}
            icon={<SaveOutlined />}>
              Изменить
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
