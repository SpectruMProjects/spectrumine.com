import axios_lib, { AxiosError } from 'axios'

const url = import.meta.env.PROD
  ? 'https://devapi.spectrumine.com'
  : 'https://devapi.spectrumine.com'
    //'http://localhost:5168'
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
  }
}
let updateTokenCycle: ReturnType<typeof setTimeout> | undefined
export async function startUpdateTokenCycle() {
  await updateAccessToken()
  updateTokenCycle = setInterval(() => {
    updateAccessToken()
  }, 1000 * 60 * 4)
}
export function stopUpdateTokenCycle() {
  clearInterval(updateTokenCycle)
}
interface Register {
  username: string
  password: string
  email: string
}
type RegisterResponse =
  | {
      code: 'ok'
    }
  | {
      code:
        | 'error'
        | 'RegexNotMatch'
        | 'Conflict'
        | 'UUIDFailed'
        | 'MailRegistered'
    }
export async function register({
  username,
  password,
  email
}: Register): Promise<RegisterResponse> {
  try {
    await axios.post('/Auth/Reg', {
      username,
      password,
      email
    })
    return { code: 'ok' }
  } catch (e) {
    if (e instanceof AxiosError) {
      return { code: e.response?.data?.cause }
    }
    return { code: 'error' }
  }
}

interface Login {
  identifier: string
  password: string
}
type LoginResponse =
  | {
      code: 'ok'
    }
  | {
      code: 'error' | 'UserNotFound' | 'InvalidPassword' | 'AccountDisabled'
    }
export async function login({
  identifier,
  password
}: Login): Promise<LoginResponse> {
  try {
    const loginRes = await axios.post('/Auth/Tokens', {
      username: identifier,
      password
    })
    tokens.refreshToken = loginRes.data.refreshToken
    tokens.accessToken = loginRes.data.accessToken
    return { code: 'ok' }
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status == 401) {
        return { code: e.response?.data?.cause }
      }
    }
    return { code: 'error' }
  }
}

type AuthResponse =
  | {
      code: 'ok'
      user: {
        id: string
        username: string
        email: string
      }
    }
  | {
      code: 'error' | '403'
    }
export async function auth(): Promise<AuthResponse> {
  try {
    const res = await axios.get('/Auth/GetUser', {
      headers: { Authorization: `Bearer ${tokens.accessToken}` }
    })
    return {
      code: 'ok',
      user: res.data
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status == 403) return { code: '403' }
    }
    return { code: 'error' }
  }
}

interface ActivateRegister {
  code: string
}
type ActivateRegisterResponse =
  | {
      code: 'ok'
    }
  | {
      code: 'error' | 'UserNotFound' | 'CodeExpire'
    }
export async function activateRegister({
  code
}: ActivateRegister): Promise<ActivateRegisterResponse> {
  try {
    const res = await axios.get(`/Mail/activate/${code}`)
    tokens.accessToken = res.data.accessToken
    tokens.refreshToken = res.data.refreshToken
    return { code: 'ok' }
  } catch (e) {
    if (e instanceof AxiosError) {
      const res = e.response
      if (res?.status == 400) {
        return { code: res?.data?.cause }
      }
    }
    return { code: 'error' }
  }
}

export type ChangePass = {
  email?: string
  newPassword: string
}
export type ChangePassResponse =
  | {
      code: 'ok'
    }
  | {
      code: 'error' | 'UserNotFound' | 'RegexNotMatch'
    }
export async function changePass({
  email,
  newPassword
}: ChangePass): Promise<ChangePassResponse> {
  try {
    if (email) {
      await axios.post('/Auth/ResetPassword', { email, newPassword })
    } else
      await axios.post(
        '/Auth/ResetPasswordAuth',
        { newPassword },
        { headers: { Authorization: `Bearer ${tokens.accessToken}` } }
      )
    return { code: 'ok' }
  } catch (e) {
    if (e instanceof AxiosError) {
      const res = e.response
      if (res?.status == 400 || res?.status == 404) {
        return { code: res?.data?.cause }
      }
    }
    return { code: 'error' }
  }
}

export type UpdateAccessTokenResponse =
  | {
      code: 'ok'
    }
  | {
      code: 'error'
    }
export async function updateAccessToken(): Promise<UpdateAccessTokenResponse> {
  if (!tokens.refreshToken) return { code: 'error' }
  try {
    const res = await axios.post('/Auth/ReloadTokens', {
      refreshToken: tokens.refreshToken
    })
    tokens.accessToken = res.data.accessToken
    tokens.refreshToken = res.data.refreshToken
    return { code: 'ok' }
  } catch (error) {
    return { code: 'error' }
  }
}

export type ActivateChangePassResponse =
  | {
      code: 'ok'
    }
  | {
      code: 'error' | 'UserNotFound' | 'CodeExpire'
    }
export async function activateChangePass(
  code: string
): Promise<ActivateChangePassResponse> {
  try {
    await axios.get(`/Mail/restore/${code}`)
    return { code: 'ok' }
  } catch (e) {
    if (e instanceof AxiosError) {
      const res = e.response
      if (res?.status == 400) {
        return { code: res?.data?.cause }
      }
    }
    return { code: 'error' }
  }
}

export async function logout() {
  try {
    await axios.post('/Auth/Logout', {
      refreshToken: tokens.refreshToken
    })
    return 'ok'
  } catch (e) {
    return 'error'
  }
}

export async function logoutAnywhere() {
  try {
    await axios.post('/Auth/ReloadTokens', {
      refreshToken: tokens.refreshToken
    })
    return 'ok'
  } catch (e) {
    return 'error'
  }
}

export type StatisticsResponse =
  | {
      code: 'ok'
      data: {
        lastServerTime: 0
        timeOnServer: 0
        deaths: {
          deathIssue: string
          deathIssuer?: string
          deathTime: number
          timeToRespawn: number
        }[]
      }
    }
  | {
      code: 'error' | 'UserNotFound'
    }
export async function statistics(
  username: string
): Promise<StatisticsResponse> {
  try {
    const res = await axios.get(`/Hardcore/stats/${username}`)
    return {
      code: 'ok',
      data: res.data
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.status == 404) return { code: 'UserNotFound' }
    }
    return { code: 'error' }
  }
}

export type GetHardcoreProductsResponse =
  | {
      code: 'ok'
      data: {
        id: string
        name: string
        description: string
        imgUrl: string
        objUrl: string
        price: string
      }[]
    }
  | {
      code: 'error'
    }
export async function getHardcoreProducts(): Promise<GetHardcoreProductsResponse> {
  try {
    const res = await axios.get('/Products/hardcore')
    return {
      code: 'ok',
      data: res.data.map((product: any) => ({
        ...product,
        price: String(product.price)
      }))
    }
  } catch (e) {
    return { code: 'error' }
  }
}

export type GetInventoryResponse =
  | {
      code: 'ok'
      data: {
        id: string
        name: string
        description: string
        category: string
        imgUrl: string
        objUrl: string
        matUrl: string
        price: number
      }[]
    }
  | { code: 'error' }
export async function getInventory(): Promise<GetInventoryResponse> {
  try {
    const res = await axios.get('/Products/GetUserInventory', {
      headers: { Authorization: `Bearer ${tokens.accessToken}` }
    })
    return {
      code: 'ok',
      data: res.data
    }
  } catch (e) {
    return { code: 'error' }
  }
}

export async function checkMojangExist(
  username: string
): Promise<boolean | null> {
  try {
    await axios.get(`${url}/Auth/Checklicense/${username}`)
    return true
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response ? false : null
    } else return null
  }
}

export type GetServerOnlineResponse =
  | {
      online: true
      max: number
      current: number
    }
  | {
      online: false
    }
export async function getServerOnline(
  ip = ''
): Promise<GetServerOnlineResponse> {
  const res = await axios.get(`https://api.mcsrvstat.us/2/${ip}`)

  if (!res.data.online) return { online: false }

  return {
    online: true,
    max: res.data.players.max,
    current: res.data.players.online
  }
}
