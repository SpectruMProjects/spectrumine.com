import { useUserTheme } from '@/store/theme'
import { Form, Input } from 'antd'

export default function Identifier() {
  const locale = useUserTheme((s) => s.locale.forms.identifier)

  return (
    <Form.Item
      name="identifier"
      rules={[{ required: true, message: locale.rules.required }]}
      required
    >
      <Input placeholder={locale.placeholder} />
    </Form.Item>
  )
}
