import { create } from 'zustand'
import { User } from '../models'
import * as api from '../api'
import { useUserTheme } from './theme'

interface Register {
  username: string
  email: string
  password: string
}

interface Login {
  identifier: string
  password: string
}

type Status = 'unknown' | 'process' | 'ok' | 'error'
type ResStatus = ['process'] | ['ok'] | ['error', string]

interface AuthPageState {
  user: User | null

  type: 'register' | 'login' | 'change pass'

  registerStatus: Status
  loginStatus: Status
  activateRegisterCodeStatus: Status
  checkUsernameStatus: Status
  changePassStatus: Status
  authStatus: Status

  switchType(type?: AuthPageState['type']): void

  register(data: Register): Promise<ResStatus>
  login(data: Login): Promise<ResStatus>
  activateRegisterCode(code: string): Promise<ResStatus>
  auth(): Promise<'process' | 'ok' | 'error'>

  checkUsername(username: string): Promise<'ok' | 'error' | 'process'>
  logout(): void

  changePass(newPassword: string, email?: string): Promise<ResStatus>
}

export const useAuthPageState = create<AuthPageState>((set, get) => ({
  user: null,

  type: 'register',
  registerStatus: 'unknown',
  loginStatus: 'unknown',
  activateRegisterCodeStatus: 'unknown',
  checkUsernameStatus: 'unknown',
  changePassStatus: 'unknown',
  authStatus: 'unknown',

  switchType(type) {
    if (type) {
      set({ type })
    } else {
      set({ type: get().type == 'login' ? 'register' : 'login' })
    }
  },

  async register(data) {
    if (get().registerStatus == 'process') return ['process']
    set({ registerStatus: 'process' })

    const res = await api.register(data)
    const locale = useUserTheme.getState().locale.messages

    switch (res.code) {
      case 'ok': {
        set({ registerStatus: 'ok' })
        return ['ok']
      }
      case 'Conflict': {
        set({ registerStatus: 'error' })
        return ['error', locale.accountWithSameNicknameAlreadyExists]
      }
      case 'RegexNotMatch': {
        set({ registerStatus: 'error' })
        return ['error', locale.invalidForm]
      }
      case 'MailRegistered': {
        set({ registerStatus: 'error' })
        return ['error', locale.accountWithSameEmailAlreadyExists]
      }
      case 'UUIDFailed': {
        set({ registerStatus: 'error' })
        return ['error', locale.accountWithSameNicknameNotExistsInMojang]
      }
      default: {
        set({ registerStatus: 'error' })
        return ['error', locale.unknownErrorOccurred + ' ' + res.code]
      }
    }
  },

  async login(data) {
    if (get().loginStatus == 'process') return ['process']
    set({ loginStatus: 'process' })

    const res = await api.login(data)
    const locale = useUserTheme.getState().locale.messages

    switch (res.code) {
      case 'ok': {
        set({ loginStatus: 'ok' })
        get().auth()
        return ['ok']
      }

      case 'AccountDisabled': {
        set({ loginStatus: 'error' })
        return ['error', locale.accountNotActivated]
      }

      case 'InvalidPassword': {
        set({ loginStatus: 'error' })
        return ['error', locale.incorrectPassword]
      }

      case 'UserNotFound': {
        set({ loginStatus: 'error' })
        return ['error', locale.userNotFound]
      }

      case 'error': {
        set({ loginStatus: 'error' })
        return ['error', locale.unknownErrorOccurred]
      }

      default: {
        set({ loginStatus: 'unknown' })
        return ['error', locale.unknownErrorOccurred]
      }
    }
  },

  async activateRegisterCode(code) {
    if (get().activateRegisterCodeStatus === 'process') return ['process']
    set({ activateRegisterCodeStatus: 'process' })

    const res = await api.activateRegister({ code })
    const locale = useUserTheme.getState().locale.messages

    switch (res.code) {
      case 'ok':
        get().auth()
        set({ activateRegisterCodeStatus: 'ok' })
        return ['ok']

      case 'CodeExpire':
        set({ activateRegisterCodeStatus: 'error' })
        return ['error', locale.codeExpired]

      case 'UserNotFound':
        set({ activateRegisterCodeStatus: 'error' })
        return ['error', locale.userNotFound]

      case 'error':
        set({ activateRegisterCodeStatus: 'error' })
        return ['error', locale.unknownErrorOccurred]

      default:
        set({ activateRegisterCodeStatus: 'unknown' })
        return ['error', locale.unknownErrorOccurred]
    }
  },

  async auth() {
    if (get().authStatus == 'process') return 'process'
    set({ authStatus: 'process' })

    const res = await api.auth()
    switch (res.code) {
      case 'ok': {
        const { id, username, email } = res.user
        const user = new User(id, username, email)
        set({ user, authStatus: 'ok' })
        return 'ok'
      }
      default:
        set({ user: null, authStatus: 'error' })
        return 'error'
    }
  },

  logout() {
    set({ user: null })
    api.logout().then(() => {
      api.tokens.accessToken = null
      api.tokens.refreshToken = null
    })
  },

  async checkUsername(username) {
    if (get().checkUsernameStatus == 'process') return 'process'
    set({ checkUsernameStatus: 'process' })

    const exists = await api.checkMojangExist(username)
    switch (exists) {
      case true: {
        set({ checkUsernameStatus: 'ok' })
        return 'ok'
      }
      case false: {
        set({ checkUsernameStatus: 'error' })
        return 'error'
      }
      default: {
        set({ checkUsernameStatus: 'unknown' })
        return 'error'
      }
    }
  },

  async changePass(newPassword, email) {
    if (get().changePassStatus == 'process') return ['process']
    set({ changePassStatus: 'process' })

    const res = await api.changePass({ newPassword, email })
    const locale = useUserTheme.getState().locale.messages

    switch (res.code) {
      case 'ok':
        set({ changePassStatus: 'ok' })
        return ['ok']

      case 'UserNotFound':
        set({ changePassStatus: 'error' })
        return ['error', locale.userNotFound]

      case 'error':
        set({ changePassStatus: 'error' })
        return ['error', locale.unknownErrorOccurred]

      default:
        set({ changePassStatus: 'unknown' })
        return ['error', locale.unknownErrorOccurred]
    }
  }
}))
