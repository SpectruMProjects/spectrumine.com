import { useUserTheme } from '@/store/theme'
import { Form, Input } from 'antd'

export default function Password() {
  const locale = useUserTheme((s) => s.locale.forms.password)

  return (
    <Form.Item
      name="password"
      rules={[
        { required: true, message: locale.rules.required },
        { min: 8, max: 32, message: locale.rules.between(8, 32) },
        {
          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
          message: locale.rules.mustContainNumbersAndUppercase
        }
      ]}
      required
    >
      <Input type="password" placeholder={locale.placeholder} />
    </Form.Item>
  )
}
