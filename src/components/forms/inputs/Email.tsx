import { useUserTheme } from "@/store/theme";
import { Form, Input } from "antd";

export default function Email() {
  const locale = useUserTheme(s => s.locale.forms)

  return (
    <Form.Item 
      name="email" 
      rules={[
        { required: true, message: locale.email.rules['required'] },
        { type: 'email', message: locale.email.rules['valid'] }
      ]}
      required>
      <Input type="email" placeholder={locale.email.placeholder} autoComplete="email" />
    </Form.Item>
  )
}
