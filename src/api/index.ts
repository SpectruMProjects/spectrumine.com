import axios from 'axios'

function url(uri: string) {
  return uri.startsWith('/')
    ? `http://localhost:5168${uri}`
    : `http://localhost:5168/${uri}`
}

interface Login {
  username: string
  password: string
  email: string
}
type LoginResponse =
{
  code: 'ok'
} | {
  code: 'error'
}
export async function login({
  username,
  password,
  email
}: Login): Promise<LoginResponse> {
  try {
    const res = await axios.post(url('/Auth/Reg'), { 
      username,
      password,
      email
    })
    return { 
      code: 'ok' 
    }
  } catch (e) {
    return { code: 'error' }
  }
}