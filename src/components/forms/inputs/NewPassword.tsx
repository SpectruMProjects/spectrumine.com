import { useUserTheme } from "@/store/theme";
import { Form, Input } from "antd";

export default function NewPassword() {
  const locale = useUserTheme(s => s.locale.forms)

  return (
    <Form.Item name="newPassword" rules={[
      { required: true, message: locale.password.rules.required },
      { min: 8, max: 32, message: locale.password.rules.between(8, 32) },
      {
        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
        message: locale.password.rules.mustContainNumbersAndUppercase
      }
    ]} required>
      <Input type="password" placeholder={locale.password.newPlaceholder} />
    </Form.Item>
  )
}
