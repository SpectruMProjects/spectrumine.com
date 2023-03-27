import axios_lib from 'axios'
const axios = axios_lib.create({ url: 'http://localhost:5168' })

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
    const res = await axios.post('/Auth/Reg', { 
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