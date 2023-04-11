import { create } from "zustand"
import { User } from "../models"
import * as api from '../api'

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

  switchType(type?: AuthPageState['type']): void
  
  register(data: Register): Promise<ResStatus>
  login(data: Login): Promise<ResStatus>
  activateRegisterCode(code: string): Promise<ResStatus>
  auth(): Promise<'process' | 'ok' | 'error'>,
  
  checkUsername(username: string): Promise<'ok' | 'error' | 'process'>
  logout(): void

  changePass(newPassword: string, email?: string): Promise<ResStatus>
}

const messages = {
  error: 'Произошла неизвестная ошибка',
  codeExpire: 'Срок действия кода истёк',
  userNotFound: 'Польщователь не найден'
}

export const useAuthPageState = create<AuthPageState>((set, get) => ({
  user: null,
  
  type: 'register',
  registerStatus: 'unknown',
  loginStatus: 'unknown',
  activateRegisterCodeStatus: 'unknown',
  checkUsernameStatus: 'unknown',
  changePassStatus: 'unknown',

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
    switch(res.code) {
      case 'ok': {
        set({ registerStatus: 'ok' })
        return ['ok']
      }
      case 'Conflict': {
        set({ registerStatus: 'error' })
        return ['error', 'Аккаунт с таким ником уже существует']
      }
      case 'RegexNotMatch': {
        set({ registerStatus: 'error' })
        return ['error', 'Неправильно заполнена форма']
      }
      case 'MailRegistered': {
        set({ registerStatus: 'error' })
        return ['error', 'Аккаунт с такой почтой уже существует']
      }
      case 'UUIDFailed': {
        set({ registerStatus: 'error' })
        return ['error', 'Аккаунта не существует со стороны Mojang']
      }
      default: {
        set({ registerStatus: 'error' })
        return ['error', 'Произошла неизвестная ошибка ' + res.code]
      }
    }
  },

  async login(data) {
    if (get().loginStatus == 'process') return ['process']
    set({ loginStatus: 'process' })

    const res = await api.login(data)
    switch(res.code) {
      case 'ok': {
        set({ loginStatus: 'ok' })
        get().auth()
        return ['ok']
      }
      
      case 'AccountDisabled': {
        set({ loginStatus: 'error' })
        return ['error', 'Аккакунт не активирован']
      }
      
      case 'InvalidPassword': {
        set({ loginStatus: 'error' })
        return ['error', 'Неверный пароль']
      }

      case 'UserNotFound': {
        set({ loginStatus: 'error' })
        return ['error', 'Пользователь не найден']
      }
      
      case 'error': {
        set({ loginStatus: 'error' })
        return ['error', 'Произошла неизвестная ошибка']
      }
      
      default: {
        set({ loginStatus: 'unknown' })
        return ['error', 'Произошла неизвестная ошибка']
      }
    }
  },

  async activateRegisterCode(code) {
    if (get().activateRegisterCodeStatus === 'process') return ['process']
    set({ activateRegisterCodeStatus: 'process' })

    const res = await api.activateRegister({code})
    switch (res.code) {
      case 'ok':
        get().auth()
        set({ activateRegisterCodeStatus: 'ok' })
        return ['ok']

      case 'CodeExpire':
        set({ activateRegisterCodeStatus: 'error' })
        return ['error', messages.codeExpire]

      case 'UserNotFound':
        set({ activateRegisterCodeStatus: 'error' })
        return ['error', messages.userNotFound]
    
      case 'error':
        set({ activateRegisterCodeStatus: 'error' })
        return ['error', messages.error]
      
        default:
        set({ activateRegisterCodeStatus: 'unknown' })
        return ['error', messages.error]
    }
  },

  async auth() {
    const res = await api.auth()
    switch (res.code) {
      case 'ok':   
        const { id, username, email } = res.user
        const user = new User(id, username, email)
        set({ user })
        return 'ok'
      default:
        set({ user: null })
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
    
    switch (res.code) {
      case 'ok':
        set({ changePassStatus: 'ok' })   
        return ['ok']

      case 'UserNotFound':
        set({ changePassStatus: 'error' })   
        return ['error', messages.userNotFound]
    
      case 'error':
        set({ changePassStatus: 'error' })   
        return ['error', messages.error]
    
      default:
        set({ changePassStatus: 'unknown' })
        return ['error', messages.error]
    }
  }
}))