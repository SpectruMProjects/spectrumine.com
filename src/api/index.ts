import axios_lib, { AxiosError } from 'axios'

let url = import.meta.env.PROD ? "https://devapi.spectrumine.com" : "https://devapi.spectrumine.com" //: "http://localhost:5000"
const axios = axios_lib.create({ baseURL: url })

export const tokens = {
  get accessToken(): string | null {
    return localStorage.getItem('accessToken')
  },
  set accessToken(token: string | null) {
    if (!token) {
      localStorage.removeItem('accessToken')
      return
    }
    localStorage.setItem('accessToken', token)
  },
  get refreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  },
  set refreshToken(token: string | null) {
    if (!token) {
      localStorage.removeItem('refreshToken')
      return
    }
    localStorage.setItem('refreshToken', token)
  },
}
interface LocalUser {
  username: string
  email?: string
}
export const localUser = {
  get(): LocalUser | null {
    const data = localStorage.getItem('user')
    if (!data) return null
    return JSON.parse(data)
  },
  set(user: LocalUser | null) {
    if (!user) {
      localStorage.removeItem('user')
      return
    }
    localStorage.setItem('user', JSON.stringify(user))
  }
}

interface Register {
  username: string
  password: string
  email: string
}
type RegisterResponse = {
  cause: String,
  message: String
}
export async function register({
  username,
  password,
  email
}: Register): Promise<RegisterResponse | null> {
  try {
    let res = await axios.post('/Auth/Reg', { 
      username,
      password,
      email
    })
    localUser.set({ username, email })
    return null
  } catch (e) {
    if (e instanceof AxiosError){
        return e.response?.data
    }
    return null
  }
}

interface Login {
  username: string
  password: string
}
type LoginResponse =
{
  code: 'ok',
} | {
  code: 'error'
}
export async function login({
  username,
  password
}: Login): Promise<LoginResponse> {
  try {
    const loginRes = await axios.post('/Auth/Tokens', { 
      username,
      password
    })
    tokens.refreshToken = loginRes.data.refreshToken
    tokens.accessToken = loginRes.data.accessToken
    localUser.set({ username })
    
    return { code: 'ok' }
  } catch (e) {
    return { code: 'error' }
  }
}

type AuthResponse = {
  code: 'ok'
} | {
  code: 'error'
}
export async function auth(): Promise<AuthResponse> {
  try {
    const res = await axios.get('/Auth/CheckToken', { 
      headers: { Authorization: `Bearer ${tokens.accessToken}` 
    }})
    localUser.set({ username: res.data })
    return { code: 'ok' }
  } catch (e) {
    return { code: 'error' }
  }
}

interface ActivateRegister {
  code: string
}
type ActivateRegisterResponse = {
  code: 'ok'
} | {
  code: 'error'
}
export async function activateRegister({ code }: ActivateRegister): Promise<ActivateRegisterResponse> {
  try {
    await axios.get(`/Mail/activate/${code}`)
    return { code: 'ok' }
  } catch (e) {
    return { code: 'error' }
  }
}