import axios_lib, { AxiosError } from 'axios'

let url = import.meta.env.PROD ? "https://devapi.spectrumine.com" : "http://localhost:5168"
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
let updateTokenCycle: number
export async function startUpdateTokenCycle() {
  await updateAccessToken()
  updateTokenCycle = setInterval(() => {
    updateAccessToken()
  }, 1000*60*4)
}
export function stopUpdateTokenCycle() {
  clearInterval(updateTokenCycle)
}

interface Register {
  username: string
  password: string
  email: string
}
type RegisterResponse = {
  code: 'ok'
} | {
  code: 'error' | 
        'RegexNotMatch' | 
        'Conflict' | 
        'UUIDFailed' |
        'MailRegistered'
}
export async function register({
  username,
  password,
  email
}: Register): Promise<RegisterResponse> {
  try {
    let res = await axios.post('/Auth/Reg', { 
      username,
      password,
      email
    })
    return { code: 'ok' }
  } catch (e) {
    if (e instanceof AxiosError){
      return { code: e.response?.data?.cause }
    }
    return { code: 'error' }
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
    return { code: 'ok' }
  } catch (e) {
    return { code: 'error' }
  }
}

type AuthResponse = {
  code: 'ok',
  user: {
    id: string,
    username: string,
    email: string
  }
} | {
  code: 'error'
}
export async function auth(): Promise<AuthResponse> {
  try {
    const res = await axios.get('/Auth/GetUser', { 
      headers: { Authorization: `Bearer ${tokens.accessToken}` 
    }})
    return { 
      code: 'ok',
      user: res.data
    }
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
    const res = await axios.get(`/Mail/activate/${code}`)
    tokens.accessToken = res.data.accessToken    
    tokens.refreshToken = res.data.refreshToken    
    return { code: 'ok' }
  } catch (e) {
    return { code: 'error' }
  }
}

export async function checkMojangExist(username: string): Promise<boolean | null> {
  try{
    await axios.get(`${url}/Auth/Checklicense/${username}`)
    return true
  } catch(e) {
    if(e instanceof AxiosError) {
      return e.response ? false : null
    } else return null
  }
}


export type ChangePass = {
  email?: string,
  newPassword: string
}
export type ChangePassResponse = {
  code: 'ok'
} | {
  code: 'error'
}
export async function changePass({
  email,
  newPassword
}: ChangePass): Promise<ChangePassResponse> {
  try {
    if (email) {
      await axios.post('/Auth/ResetPassword', { email, newPassword })
    } else await axios.post(
      '/Auth/ResetPasswordAuth',
      { newPassword },
      { headers: { 'Authorization': `Bearer ${tokens.accessToken}` } })
    return { code: 'ok' }
  } catch (error) {
    return { code: 'error' }
  }
}

export type UpdateAccessTokenResponse = {
  code: 'ok'
} | {
  code: 'error'
}
export async function updateAccessToken(): Promise<UpdateAccessTokenResponse> {
  if (!tokens.refreshToken) return { code: 'error' }
  try {
    const res = await axios.post('/Auth/ReloadTokens', { refreshToken: tokens.refreshToken })
    tokens.accessToken = res.data.accessToken
    tokens.refreshToken = res.data.refreshToken
    return { code: 'ok' }
  } catch (error) {
    return { code: 'error' }
  }
}

export type ActivateChangePassResponse = {
  code: 'ok'
} | {
  code: 'error'
}
export async function activateChangePass(code: string): Promise<ActivateChangePassResponse> {
  try {
    await axios.get(`/Mail/restore/${code}`)
    return { code: 'ok' }
  } catch (e) {
    return { code: 'error' }
  }
}