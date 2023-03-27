import axios from 'axios'

function url(uri: string) {
  return uri.startsWith('/')
    ? `http://localhost:5168${uri}`
    : `http://localhost:5168/${uri}`
}

interface Register {
  username: string
  password: string
  email: string
}
type RegisterResponse =
{
  code: 'ok'
} | {
  code: 'error'
}
export async function register({
  username,
  password,
  email
}: Register): Promise<RegisterResponse> {
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