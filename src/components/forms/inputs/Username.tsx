import { useDebounce } from '@/core'
import { useAuthPageState } from '@/store'
import { useUserTheme } from '@/store/theme'
import { Form, Input } from 'antd'
import { useState } from 'react'

interface Form {
  username: string
}

export default function Username() {
  const locale = useUserTheme((s) => s.locale.forms.username)
  const [checkUsername] = useAuthPageState((s) => [s.checkUsername])
  const [username, setUsername] = useState<string | undefined>(undefined)
  const [usernameW, setUsernameW] = useState<boolean>(false)
  const [usernameH, setUsernameH] = useState<undefined | string>(undefined)
  const form = Form.useFormInstance<Form>()

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
          result == 'error' ? locale.warnings.noMojangAccount : undefined
        )
      })
    },
    1000,
    username
  )

  return (
    <Form.Item
      name="username"
      rules={[
        { required: true, message: locale.rules.required },
        { min: 3, max: 16, message: locale.rules.between(3, 16) },
        {
          pattern: /^[a-zA-Z0-9_]{3,16}$/,
          message: locale.rules.latinAndNumbers
        }
      ]}
      validateStatus={usernameW ? 'warning' : undefined}
      help={usernameH}
      required
    >
      <Input
        placeholder={locale.placeholder}
        autoComplete="username"
        onChange={(e) => {
          setUsername(e.target.value)
        }}
        allowClear
      />
    </Form.Item>
  )
}
